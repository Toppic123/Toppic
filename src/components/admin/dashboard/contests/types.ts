
// Types for contest management
export type ContestStatus = "active" | "pending" | "finished";

export interface Contest {
  id: string;
  title: string;
  organizer: string;
  status: ContestStatus;
  participants: number;
}

// Contest form state type
export type ContestFormData = {
  title: string;
  organizer: string;
  startDate: string;
  endDate: string;
  photoDeadline: string;
  description: string;
  status: ContestStatus;
  maxParticipants: number;
  photoOwnership: boolean;
  commercialUse: boolean;
};

export type ContestFormProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  contestFormData: ContestFormData;
  setContestFormData: React.Dispatch<React.SetStateAction<ContestFormData>>;
  handleSaveChanges: () => void;
};
