
import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { UserCircle2 } from "lucide-react"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

const AvatarUpload = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    onImageSelect?: (file: File) => void;
    previewUrl?: string;
    size?: "sm" | "md" | "lg";
  }
>(({ className, onImageSelect, previewUrl, size = "md", ...props }, ref) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const sizeClasses = {
    sm: "h-16 w-16",
    md: "h-24 w-24",
    lg: "h-32 w-32",
  };
  
  const handleClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageSelect) {
      onImageSelect(file);
    }
  };
  
  return (
    <div 
      ref={ref} 
      className={cn(
        "relative cursor-pointer group", 
        sizeClasses[size],
        className
      )}
      onClick={handleClick}
      {...props}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*"
        onChange={handleFileChange}
      />
      
      <Avatar className="h-full w-full border-2 border-muted">
        {previewUrl ? (
          <AvatarImage src={previewUrl} alt="Profile" />
        ) : (
          <AvatarFallback>
            <UserCircle2 className="h-3/4 w-3/4 text-muted-foreground" />
          </AvatarFallback>
        )}
      </Avatar>
      
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-white text-xs font-medium">
          Cambiar foto
        </span>
      </div>
    </div>
  );
});
AvatarUpload.displayName = "AvatarUpload";

export { Avatar, AvatarImage, AvatarFallback, AvatarUpload }
