
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Camera, Upload as UploadIcon, MapPin, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";

// Mock nearby contests
const nearbyContests = [
  { id: "1", name: "Summer in Barcelona", distance: "0.5 km" },
  { id: "2", name: "Urban Architecture", distance: "1.2 km" },
  { id: "3", name: "Beach Life", distance: "3.4 km" },
];

const Upload = () => {
  const { contestId } = useParams<{ contestId: string }>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedContest, setSelectedContest] = useState<string>(contestId || "");
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to upload photos",
        variant: "destructive"
      });
      navigate('/login');
    }
  }, [user, navigate, toast]);

  const compressImage = async (file: File, maxWidth = 1200): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = document.createElement('img');
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Scale down if width exceeds maxWidth
          if (width > maxWidth) {
            const ratio = maxWidth / width;
            width = maxWidth;
            height = height * ratio;
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          canvas.toBlob((blob) => {
            if (blob) resolve(blob);
            else reject(new Error('Canvas to Blob conversion failed'));
          }, 'image/jpeg', 0.8); // 0.8 quality for JPEG
        };
        img.onerror = () => reject(new Error('Image loading error'));
      };
      reader.onerror = () => reject(new Error('FileReader error'));
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image less than 5MB",
          variant: "destructive"
        });
        return;
      }
      
      try {
        // Store original file for later submission
        setOriginalFile(file);
        
        // Compress for preview
        const compressedBlob = await compressImage(file);
        const compressedUrl = URL.createObjectURL(compressedBlob);
        setPreviewUrl(compressedUrl);
        
        toast({
          title: "Image loaded",
          description: "Preview generated with optimized quality"
        });
      } catch (error) {
        console.error("Error processing image:", error);
        toast({
          title: "Error processing image",
          description: "Please try another image",
          variant: "destructive"
        });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!originalFile) {
      toast({
        title: "Image required",
        description: "Please select an image to participate",
        variant: "destructive"
      });
      return;
    }

    if (!selectedContest) {
      toast({
        title: "Contest required",
        description: "Please select a contest to participate in",
        variant: "destructive"
      });
      return;
    }
    
    // Here you would upload both the originalFile (for storage) and the metadata
    console.log("Photo submitted to contest:", selectedContest);
    console.log("Original file to be stored:", originalFile);
    console.log("Title:", title);
    console.log("Description:", description);
    
    toast({
      title: "Photo submitted!",
      description: "Your photo has been submitted to the contest"
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container max-w-md mx-auto py-12 px-4"
    >
      <Card>
        <CardHeader>
          <CardTitle>Upload Photo</CardTitle>
          <CardDescription>
            Participate in a contest by sharing your best photograph
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="contest">Select a nearby contest</Label>
              <Select 
                value={selectedContest} 
                onValueChange={setSelectedContest}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a contest" />
                </SelectTrigger>
                <SelectContent>
                  {nearbyContests.map(contest => (
                    <SelectItem key={contest.id} value={contest.id}>
                      {contest.name} ({contest.distance})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo">Select a photo</Label>
              {previewUrl ? (
                <div className="relative rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
                  <img src={previewUrl} alt="Preview" className="w-full h-auto" />
                  <Button 
                    type="button" 
                    variant="secondary" 
                    size="sm" 
                    className="absolute bottom-2 right-2"
                    onClick={() => {
                      setPreviewUrl(null);
                      setOriginalFile(null);
                    }}
                  >
                    Change
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center hover:border-primary transition-colors">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Camera className="h-10 w-10 text-muted-foreground" />
                    <div className="flex flex-col space-y-1 text-sm text-muted-foreground">
                      <span>Drag your photo here or</span>
                      <label htmlFor="photo" className="relative cursor-pointer text-blue-600 hover:underline">
                        <span>select a file</span>
                        <Input
                          id="photo"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={handleFileUpload}
                        />
                      </label>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      JPG, PNG or GIF. Maximum 5MB.
                    </span>
                  </div>
                </div>
              )}
              {previewUrl && (
                <p className="text-xs text-muted-foreground mt-1">
                  Note: Your photo is shown in optimized quality for web, but will be saved in its original quality.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Photo title</Label>
              <Input 
                id="title" 
                placeholder="Add a descriptive title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Input 
                id="description" 
                placeholder="Tell us about your photo..." 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Your location will be automatically added</span>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" onClick={handleSubmit}>
            <UploadIcon className="mr-2 h-4 w-4" />
            Upload photo
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default Upload;
