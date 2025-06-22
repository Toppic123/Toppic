
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { Resend } from "npm:resend@4.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const resend = new Resend(Deno.env.get('RESEND_API_KEY') as string);

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000));
    const sevenDaysFromNow = new Date(now.getTime() + (7 * 24 * 60 * 60 * 1000));

    // Find albums expiring in 30 days (need first warning)
    const { data: albumsFor30DayWarning, error: error30 } = await supabaseAdmin
      .from('album_storage')
      .select(`
        *,
        contests (
          title,
          organizer
        ),
        organizers (
          email
        )
      `)
      .gte('storage_expires_at', now.toISOString())
      .lte('storage_expires_at', thirtyDaysFromNow.toISOString())
      .eq('is_active', true);

    if (error30) {
      console.error('Error fetching 30-day warning albums:', error30);
    }

    // Find albums expiring in 7 days (need final warning)
    const { data: albumsFor7DayWarning, error: error7 } = await supabaseAdmin
      .from('album_storage')
      .select(`
        *,
        contests (
          title,
          organizer
        ),
        organizers (
          email
        )
      `)
      .gte('storage_expires_at', now.toISOString())
      .lte('storage_expires_at', sevenDaysFromNow.toISOString())
      .eq('is_active', true);

    if (error7) {
      console.error('Error fetching 7-day warning albums:', error7);
    }

    let emailsSent = 0;

    // Send 30-day warnings
    if (albumsFor30DayWarning) {
      for (const album of albumsFor30DayWarning) {
        // Check if we already sent this notification
        const { data: existingNotification } = await supabaseAdmin
          .from('album_storage_notifications')
          .select('id')
          .eq('album_storage_id', album.id)
          .eq('notification_type', '30_days')
          .single();

        if (!existingNotification && album.organizers?.email) {
          try {
            await resend.emails.send({
              from: 'Pix On Air <noreply@pixonair.com>',
              to: [album.organizers.email],
              subject: `Recordatorio: Tu álbum "${album.contests?.title}" expira en 30 días`,
              html: `
                <h2>Recordatorio de almacenamiento</h2>
                <p>Hola,</p>
                <p>Te recordamos que el almacenamiento de tu álbum del concurso "<strong>${album.contests?.title}</strong>" expirará en aproximadamente 30 días.</p>
                <p><strong>Fecha de expiración:</strong> ${new Date(album.storage_expires_at).toLocaleDateString()}</p>
                <p><strong>Precio de renovación:</strong> ${(album.renewal_price_cents / 100)}€/año</p>
                <div style="margin: 20px 0;">
                  <a href="${Deno.env.get('SITE_URL')}/dashboard/contests/${album.contest_id}" 
                     style="background-color: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                    Renovar almacenamiento
                  </a>
                </div>
                <p>También puedes descargar todas las fotos del álbum antes de la fecha de expiración.</p>
                <p>Saludos,<br>El equipo de Pix On Air</p>
              `
            });

            // Record the notification
            await supabaseAdmin
              .from('album_storage_notifications')
              .insert({
                album_storage_id: album.id,
                notification_type: '30_days',
                email_sent_to: album.organizers.email
              });

            emailsSent++;
          } catch (emailError) {
            console.error(`Error sending 30-day warning email for album ${album.id}:`, emailError);
          }
        }
      }
    }

    // Send 7-day warnings
    if (albumsFor7DayWarning) {
      for (const album of albumsFor7DayWarning) {
        // Check if we already sent this notification
        const { data: existingNotification } = await supabaseAdmin
          .from('album_storage_notifications')
          .select('id')
          .eq('album_storage_id', album.id)
          .eq('notification_type', '7_days')
          .single();

        if (!existingNotification && album.organizers?.email) {
          try {
            await resend.emails.send({
              from: 'Pix On Air <noreply@pixonair.com>',
              to: [album.organizers.email],
              subject: `⚠️ URGENTE: Tu álbum "${album.contests?.title}" expira en 7 días`,
              html: `
                <h2 style="color: #dc2626;">Recordatorio final de almacenamiento</h2>
                <p>Hola,</p>
                <p><strong>ATENCIÓN:</strong> El almacenamiento de tu álbum del concurso "<strong>${album.contests?.title}</strong>" expirará en solo 7 días.</p>
                <p><strong>Fecha de expiración:</strong> ${new Date(album.storage_expires_at).toLocaleDateString()}</p>
                <p><strong>Precio de renovación:</strong> ${(album.renewal_price_cents / 100)}€/año</p>
                
                <div style="background-color: #fef2f2; border: 1px solid #fecaca; padding: 15px; margin: 20px 0; border-radius: 5px;">
                  <p style="margin: 0; color: #dc2626;"><strong>Si no renuevas antes del vencimiento, perderás acceso permanente a todas las fotos del álbum.</strong></p>
                </div>
                
                <div style="margin: 20px 0;">
                  <a href="${Deno.env.get('SITE_URL')}/dashboard/contests/${album.contest_id}" 
                     style="background-color: #dc2626; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-right: 10px;">
                    Renovar ahora
                  </a>
                  <a href="${Deno.env.get('SITE_URL')}/dashboard/contests/${album.contest_id}/download" 
                     style="background-color: #6b7280; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                    Descargar álbum
                  </a>
                </div>
                
                <p>Saludos,<br>El equipo de Pix On Air</p>
              `
            });

            // Record the notification
            await supabaseAdmin
              .from('album_storage_notifications')
              .insert({
                album_storage_id: album.id,
                notification_type: '7_days',
                email_sent_to: album.organizers.email
              });

            emailsSent++;
          } catch (emailError) {
            console.error(`Error sending 7-day warning email for album ${album.id}:`, emailError);
          }
        }
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        emailsSent,
        message: `Sent ${emailsSent} storage expiration notifications` 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in send-storage-notifications:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
