
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BannerUploader } from "@/components/admin/dashboard/banners";
import { supabase } from "@/integrations/supabase/client";

// Types for banner subscription levels
export type SubscriptionLevel = "basic" | "standard" | "premium";

// Configuration for which banner types are available at each subscription level
const subscriptionBannerAccess: Record<SubscriptionLevel, string[]> = {
  basic: ["contestPage"],
  standard: ["contestPage", "sidebar"],
  premium: ["contestPage", "sidebar", "homepage"]
};

interface BannerManagementProps {
  subscriptionLevel?: SubscriptionLevel;
  isAdmin?: boolean;
  organizerId?: string;
}

const BannerManagement = ({ 
  subscriptionLevel = "premium", 
  isAdmin = false,
  organizerId 
}: BannerManagementProps) => {
  const [selectedContest, setSelectedContest] = useState<string>("all");
  const { toast } = useToast();
  const [contests, setContests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch contests from the database
  useEffect(() => {
    async function fetchContests() {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('contests')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) {
          console.error('Error fetching contests for banner management:', error);
          toast({
            title: "Error al cargar concursos",
            description: "No se pudieron cargar los concursos. Inténtalo de nuevo más tarde.",
            variant: "destructive",
          });
          const { mockContests } = await import('@/components/admin/dashboard/contests/contestUtils');
          setContests(mockContests);
        } else {
          console.log('Fetched contests for banner management:', data);
          setContests(data || []);
        }
      } catch (err) {
        console.error('Exception fetching contests for banner management:', err);
        const { mockContests } = await import('@/components/admin/dashboard/contests/contestUtils');
        setContests(mockContests);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchContests();
  }, [toast]);
  
  // Filter contests by organizer if not admin and organizerId provided
  const filteredContests = isAdmin 
    ? contests 
    : contests.filter(contest => contest.organizer === organizerId);
  
  // Get allowed banner types based on subscription level
  const allowedBannerTypes = isAdmin 
    ? ["homepage", "sidebar", "contestPage"] // Admin can manage all types
    : subscriptionBannerAccess[subscriptionLevel];
  
  const handleBannerUpload = (type: string, file: File) => {
    // Here we would integrate with backend to save the banner
    // For now just show a success message
    
    toast({
      title: "Banner subido correctamente",
      description: `El banner ${type} ha sido asignado ${selectedContest !== "all" ? `al concurso seleccionado` : 'a todos los concursos'}.`,
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-xl font-bold">Gestión de Banners Publicitarios</h2>
        
        {/* Contest selector */}
        <Card className="w-full md:w-auto">
          <CardContent className="p-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="contest-select">Asignar a concurso:</Label>
              <Select 
                value={selectedContest} 
                onValueChange={setSelectedContest}
              >
                <SelectTrigger className="w-full md:w-[240px]" id="contest-select">
                  <SelectValue placeholder="Seleccionar concurso" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los concursos</SelectItem>
                  {isLoading ? (
                    <SelectItem value="loading" disabled>Cargando concursos...</SelectItem>
                  ) : filteredContests.length > 0 ? (
                    filteredContests.map(contest => (
                      <SelectItem key={contest.id} value={contest.id}>
                        {contest.title}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-contests" disabled>No hay concursos disponibles</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <BannerUploader 
        onBannerUpload={handleBannerUpload} 
        allowedBannerTypes={allowedBannerTypes}
      />
      
      {/* Sample banners */}
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Ejemplos de banners</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-md overflow-hidden">
            <img 
              src="https://placehold.co/1200x300/4891AA/white?text=Banner+Homepage+Example" 
              alt="Example homepage banner" 
              className="w-full h-auto"
            />
            <div className="p-3 bg-muted/20">
              <p className="text-sm font-medium">Banner Homepage</p>
            </div>
          </div>
          <div className="border rounded-md overflow-hidden">
            <img 
              src="https://placehold.co/300x600/4891AA/white?text=Banner+Sidebar+Example" 
              alt="Example sidebar banner" 
              className="w-full h-auto"
            />
            <div className="p-3 bg-muted/20">
              <p className="text-sm font-medium">Banner Sidebar</p>
            </div>
          </div>
          <div className="border rounded-md overflow-hidden">
            <img 
              src="https://placehold.co/800x200/4891AA/white?text=Banner+Contest+Page+Example" 
              alt="Example contest page banner" 
              className="w-full h-auto"
            />
            <div className="p-3 bg-muted/20">
              <p className="text-sm font-medium">Banner Contest Page</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerManagement;
