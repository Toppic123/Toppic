
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2, Flag } from "lucide-react";
import PhotoComments from "@/components/PhotoComments";
import SocialShareButtons from "@/components/SocialShareButtons";
import ReportPhotoDialog from "@/components/ReportPhotoDialog";

interface MobilePhotoDetailProps {
  photo: {
    id: string;
    url: string;
    author: string;
    description: string;
    likes: number;
  };
  onBack: () => void;
}

const MobilePhotoDetail = ({ photo, onBack }: MobilePhotoDetailProps) => {
  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-gray-600 hover:bg-gray-100 p-2 mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Foto de {photo.author}</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <SocialShareButtons 
            url={window.location.href}
            title={`Foto de ${photo.author}`}
            imageUrl={photo.url}
          />
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:bg-red-50 p-2"
          >
            <ReportPhotoDialog 
              photoId={photo.id}
              trigger={<Flag className="h-4 w-4" />}
            />
          </Button>
        </div>
      </div>

      {/* Photo */}
      <div className="bg-black flex items-center justify-center flex-shrink-0">
        <img 
          src={photo.url} 
          alt={photo.description}
          className="max-w-full max-h-80 object-contain"
        />
      </div>

      {/* Photo Info */}
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-900">{photo.author}</h3>
          <div className="text-sm text-gray-500">
            {photo.likes} me gusta
          </div>
        </div>
        <p className="text-gray-600 text-sm">{photo.description}</p>
      </div>

      {/* Comments Section - Now using the real component */}
      <div className="flex-1 overflow-hidden">
        <PhotoComments photoId={photo.id} isEmbedded={true} />
      </div>
    </div>
  );
};

export default MobilePhotoDetail;
