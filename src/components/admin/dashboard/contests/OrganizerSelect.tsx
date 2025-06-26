
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Organizer {
  id: string;
  name: string;
  email: string;
}

interface OrganizerSelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const OrganizerSelect = ({ value, onChange, placeholder = "Selecciona un organizador" }: OrganizerSelectProps) => {
  const [organizers, setOrganizers] = useState<Organizer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchOrganizers();
  }, []);

  const fetchOrganizers = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('organizers')
        .select('id, name, email')
        .order('name', { ascending: true });
      
      if (error) {
        console.error('Error fetching organizers:', error);
        toast({
          title: "Error al cargar organizadores",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      if (data) {
        setOrganizers(data);
      }
    } catch (error) {
      console.error('Error fetching organizers:', error);
      toast({
        title: "Error",
        description: "Ha ocurrido un error al cargar los organizadores.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Cargando organizadores..." />
        </SelectTrigger>
      </Select>
    );
  }

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {organizers.map((organizer) => (
          <SelectItem key={organizer.id} value={organizer.name}>
            {organizer.name} ({organizer.email})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default OrganizerSelect;
