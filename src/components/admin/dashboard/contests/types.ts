
// Contest type definition
export interface Contest {
  id: string;
  title: string;
  organizer: string;
  status: "pending" | "active" | "finished";
  participants: number;
  location?: string;
  startDate?: string;
  endDate?: string;
  maxParticipants?: number;
  maxPhotosPerParticipant?: number;
  locationCoords?: { lat: number; lng: number };
  maxDistance?: number;
  description?: string;
  rules?: string;
  prizes?: string;
  categories?: string[];
  bannerUrl?: string;
}

// ContestFormData type definition (for the form)
export interface ContestFormData {
  title: string;
  organizer: string;
  startDate: string;
  endDate: string;
  photoDeadline: string;
  description: string;
  status: "pending" | "active" | "finished";
  maxParticipants: number;
  photoOwnership: boolean;
  commercialUse: boolean;
  location?: string;
}

// Props for the contest form dialog
export interface ContestFormProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  contestFormData: ContestFormData;
  setContestFormData: (data: Partial<ContestFormData>) => void;
  handleSaveChanges: () => void;
}
