
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

const adminEmail = Deno.env.get("ADMIN_EMAIL") || "admin@example.com";
const smtpHost = Deno.env.get("SMTP_HOST") || "smtp.gmail.com";
const smtpUsername = Deno.env.get("SMTP_USERNAME") || "";
const smtpPassword = Deno.env.get("SMTP_PASSWORD") || "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle preflight CORS
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message } = await req.json();

    const client = new SmtpClient();
    
    await client.connectTLS({
      hostname: smtpHost,
      port: 465,
      username: smtpUsername,
      password: smtpPassword,
    });

    await client.send({
      from: smtpUsername,
      to: adminEmail,
      subject: `Nuevo mensaje de soporte: ${subject}`,
      content: `
        <h2>Nuevo mensaje de soporte recibido</h2>
        <p><strong>De:</strong> ${name} (${email})</p>
        <p><strong>Asunto:</strong> ${subject}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
        <hr>
        <p>Este es un mensaje automático del sistema de soporte.</p>
      `,
      html: true,
    });

    await client.close();

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error sending notification:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
