export type ContestStatus = "active" | "pending" | "finished";

export interface Contest {
  id: string;
  title: string;
  description?: string;
  status: ContestStatus;
  organizer?: string;
  startDate?: string;
  start_date?: string;
  endDate?: string;
  end_date?: string;
  photoDeadline?: string;
  photo_deadline?: string;
  participants?: number;
  location?: string;
  imageUrl?: string;
  image_url?: string;
  is_private?: boolean;
  contest_password?: string;
  photo_ownership?: boolean;
  commercial_use?: boolean;
  minimum_distance_km?: number;
  prize?: string;
}

export interface ContestFormData {
  id?: string;
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
  isPrivate?: boolean;
  contestPassword?: string;
  minimumDistanceKm: number;
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
