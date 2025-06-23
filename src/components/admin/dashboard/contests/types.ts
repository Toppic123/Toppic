
export type ContestStatus = "active" | "pending" | "finished";

export interface Contest {
  id: string;
  title: string;
  description?: string;
  status: ContestStatus;
  organizer?: string;
  startDate?: string;
  endDate?: string;
  participants?: number;
  location?: string;
  imageUrl?: string;
  image_url?: string; // Add this field to match the database column
  is_private?: boolean; // New field for private contests
  contest_password?: string; // New field for contest password
}

export interface ContestFormData {
  id?: string; // Make id optional since it may not exist for new contests
  title: string;
  description: string;
  status: ContestStatus;
  organizer: string;
  startDate: string;
  endDate: string;
  photoDeadline: string;
  maxParticipants: number;
  photoOwnership: boolean;
  commercialUse: boolean;
  location: string;
  imageUrl?: string;
  isPrivate?: boolean; // New field for private contests
  contestPassword?: string; // New field for contest password
  minimumDistanceKm: number; // Add the missing property
}

export interface ContestCardProps {
  contest: Contest;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export interface ContestHeaderProps {
  onCreateNew: () => void;
}

export interface ContestSearchProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

export interface ContestFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  contestFormData: ContestFormData;
  setContestFormData: (data: ContestFormData | ((prev: ContestFormData) => ContestFormData)) => void;
  handleSaveChanges: (file?: File) => void;
}
