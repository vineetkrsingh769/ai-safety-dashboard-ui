
import { create } from 'zustand';
import { mockIncidents } from '@/lib/mockData';

interface Incident {
  id: number;
  title: string;
  description: string;
  severity: "Low" | "Medium" | "High";
  reported_at: string;
}

interface IncidentStore {
  incidents: Incident[];
  selectedSeverity: string;
  sortOrder: "asc" | "desc";
  theme: "dark" | "light";
  addIncident: (incident: Omit<Incident, "id">) => void;
  setSeverityFilter: (severity: string) => void;
  setSortOrder: (order: "asc" | "desc") => void;
  toggleTheme: () => void;
}

export const useIncidentStore = create<IncidentStore>((set) => ({
  incidents: mockIncidents as Incident[],
  selectedSeverity: "All",
  sortOrder: "desc",
  theme: "dark",
  addIncident: (newIncident) =>
    set((state) => ({
      incidents: [
        {
          ...newIncident,
          id: Math.max(...state.incidents.map((i) => i.id)) + 1,
        },
        ...state.incidents,
      ],
    })),
  setSeverityFilter: (severity) => set({ selectedSeverity: severity }),
  setSortOrder: (order) => set({ sortOrder: order }),
  toggleTheme: () => set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),
}));
