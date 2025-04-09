
import { Contest } from "./types";

// Mock data for contests
export const mockContests: Contest[] = [
  { id: "1", title: "Festival de Primavera", status: "active", organizer: "PictureThis", participants: 24 },
  { id: "2", title: "Concurso Gastronómico", status: "active", organizer: "FoodLens", participants: 38 },
  { id: "3", title: "Mar y Playa", status: "finished", organizer: "CoastalShots", participants: 17 },
  { id: "4", title: "Vida Nocturna", status: "pending", organizer: "NightOwl", participants: 5 },
];

// Filter contests by search query
export const filterContests = (contests: Contest[], query: string): Contest[] => {
  if (!query.trim()) {
    return contests;
  }
  
  return contests.filter(contest => 
    contest.title.toLowerCase().includes(query.toLowerCase()) ||
    contest.organizer.toLowerCase().includes(query.toLowerCase())
  );
};

// Get the next ID for new contests
export const getNextContestId = (contests: Contest[]): string => {
  return String(Math.max(...contests.map(c => parseInt(c.id))) + 1);
};
