
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
}

export interface ContestFormData {
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
  setContestFormData: (data: Partial<ContestFormData>) => void;
  handleSaveChanges: (file?: File) => void;
}
