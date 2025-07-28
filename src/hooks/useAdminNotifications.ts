import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useAdminNotifications = () => {
  const [unreadMessages, setUnreadMessages] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    // Load initial count of unread messages
    const loadUnreadCount = async () => {
      try {
        const { data, error } = await (supabase as any)
          .from('support_messages')
          .select('id')
          .eq('status', 'pending');
          
        if (error) throw error;
        setUnreadMessages(data?.length || 0);
      } catch (error) {
        console.error('Error loading unread messages count:', error);
      }
    };

    loadUnreadCount();

    // Set up real-time subscription for new messages
    const subscription = supabase
      .channel('admin-notifications')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'support_messages' 
      }, (payload: any) => {
        setUnreadMessages(prev => prev + 1);
        
        toast({
          title: "Nuevo mensaje de soporte",
          description: `De: ${payload.new.name} - ${payload.new.subject}`,
          duration: 5000,
        });
      })
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'support_messages'
      }, (payload: any) => {
        // Reload the count when a message is updated
        if (payload.new.status === 'resolved' && payload.old.status === 'pending') {
          setUnreadMessages(prev => Math.max(0, prev - 1));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [toast]);

  const markAllAsRead = () => {
    setUnreadMessages(0);
  };

  return {
    unreadMessages,
    markAllAsRead,
    hasUnreadMessages: unreadMessages > 0
  };
};