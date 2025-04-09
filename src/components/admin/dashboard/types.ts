
// Common types for the admin dashboard components

export type ContestFormData = {
  title: string;
  organizer: string;
  startDate: string;
  endDate: string;
  description: string;
  status: "active" | "pending" | "finished";
  maxParticipants: number;
  photoOwnership: boolean;
  commercialUse: boolean;
};

export type OrganizerFormData = {
  name: string;
  email: string;
  plan: "basic" | "professional" | "premium";
  status: "active" | "inactive";
};

export type UserFormData = {
  name: string;
  email: string;
  role: "participant" | "organizer" | "admin";
};

export type SupportMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: Date;
  status: "pending" | "resolved";
};

export type Contest = {
  id: string;
  title: string;
  status: string;
  organizer: string;
  participants: number;
};

export type Organizer = {
  id: string;
  name: string;
  email: string;
  contests: number;
  status: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  photos: number;
};
