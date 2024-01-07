export interface Project {
    id: string;
    name: string;
    startTime: Date | null;
    estimatedDuration: string;
    description: string;
    duration: string;
    totalHours: number;
    people: string[];
}
