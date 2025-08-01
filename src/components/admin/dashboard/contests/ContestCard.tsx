
import { Camera, Edit, Trash, Crown } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Contest } from "./types";

interface ContestCardProps {
  contest: Contest;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

// Function to clean contest titles by removing "FOTOGRAFIA" and similar words
const cleanContestTitle = (title: string): string => {
  if (!title) return 'Sin título';
  
  // Remove "FOTOGRAFIA", "FOTOGRAFÍA", "DE FOTOGRAFIA", etc. (case insensitive)
  const cleanedTitle = title
    .replace(/\b(de\s+)?fotograf[íi]a\b/gi, '')
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim();
  
  return cleanedTitle || 'Sin título';
};

const getPlanInfo = (plan?: string) => {
  switch (plan) {
    case 'professional':
      return { label: 'Profesional', color: 'bg-blue-100 text-blue-800', icon: '⭐' };
    case 'premium':
      return { label: 'Premium', color: 'bg-purple-100 text-purple-800', icon: '👑' };
    case 'basic':
    default:
      return { label: 'Básico', color: 'bg-gray-100 text-gray-800', icon: '📦' };
  }
};

export const ContestCard = ({ contest, onEdit, onDelete }: ContestCardProps) => {
  // Safety check for invalid contest data
  if (!contest || !contest.id) {
    console.warn("Invalid contest data provided to ContestCard:", contest);
    return null;
  }

  // Fallback image URL
  const fallbackImage = "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400&h=225&fit=crop";
  
  // Use image_url (database field) as primary source
  const imageUrl = contest.image_url || fallbackImage;
  const planInfo = getPlanInfo(contest.plan);
  
  // Clean the contest title to remove "FOTOGRAFIA" words
  const displayTitle = cleanContestTitle(contest.title);

  console.log(`Contest "${contest.title}" using image URL:`, imageUrl);
  console.log('Contest image_url from database:', contest.image_url);
  console.log('Contest cleaned title:', displayTitle);

  return (
    <Card>
      {/* Contest Image */}
      <div className="relative h-32 overflow-hidden rounded-t-lg bg-gray-100">
        <img
          src={imageUrl}
          alt={displayTitle}
          className="w-full h-full object-cover transition-opacity duration-300"
          onError={(e) => {
            console.error('Failed to load contest image:', imageUrl);
            const target = e.target as HTMLImageElement;
            if (target.src !== fallbackImage) {
              console.log('Switching to fallback image');
              target.src = fallbackImage;
            }
          }}
          onLoad={() => {
            console.log('Contest image loaded successfully:', imageUrl);
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{displayTitle}</CardTitle>
            <CardDescription>Organizado por: {contest.organizer || 'Desconocido'}</CardDescription>
            {contest.prize && (
              <CardDescription className="text-amber-600 font-medium">
                Premio: {contest.prize}
              </CardDescription>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              contest.status === 'active' ? 'bg-green-100 text-green-800' :
              contest.status === 'finished' ? 'bg-gray-100 text-gray-800' :
              'bg-amber-100 text-amber-800'
            }`}>
              {contest.status === 'active' ? 'Activo' : 
                contest.status === 'finished' ? 'Finalizado' : 'Pendiente'}
            </div>
            <Badge className={planInfo.color}>
              <span className="mr-1">{planInfo.icon}</span>
              {planInfo.label}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Camera size={16} className="text-muted-foreground" />
            <span>{contest.participants || 0} participantes</span>
          </div>
        </div>
        {contest.location && (
          <p className="text-sm text-muted-foreground mt-2">📍 {contest.location}</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => onEdit(contest.id)}>
          <Edit size={16} className="mr-1" />
          Editar
        </Button>
        <Button variant="destructive" onClick={() => onDelete(contest.id)}>
          <Trash size={16} className="mr-1" />
          Eliminar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContestCard;
