export interface Task {
    id_task: string; // Nowe pole id_task
    name: string;
    description: string;
    priority: string;
    functionality: {
        id: string;
        name: string;
        description: string;
        priority: string;
        project: string;
        owner: string;
        status: string;
        tasks: Task[];
    };
    estimatedTime: string;
    status: string;
    startDate?: string;
    endDate?: string;
    assignedUser: string;
    showDetails: boolean;
}
