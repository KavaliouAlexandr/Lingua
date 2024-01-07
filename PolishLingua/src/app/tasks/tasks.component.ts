import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  showAddTaskForm = false;
  tasks: Task[] = [];
  selectedTask: Task | null = null;
  selectedFunctionalityId: string | null = null;

  ngOnInit() {
    // Load tasks from localStorage
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }

    // Load selectedFunctionalityId from localStorage
    this.selectedFunctionalityId = localStorage.getItem('selectedFunctionalityId');

    this.saveTasksToLocalStorage();
  }

  getTasksByStatus(status: string) {
    const projectId = localStorage.getItem('projectId');
    const functionalities = localStorage.getItem(`functionalities_${projectId}`);

    if (projectId && functionalities) {
      const parsedFunctionalities = JSON.parse(functionalities);
      const functionalityIds = parsedFunctionalities.map((functionality: any) => functionality.id);

      return this.tasks.filter(task => {
        return task.status === status && functionalityIds.includes(task.functionality.id) && task.functionality.id === this.selectedFunctionalityId;
      });
    }

    return [];
  }



  addTask(task: Task) {
    // Implement your logic to add the task to the tasks array
  }

  toggleDetails(task: Task) {
    this.selectedTask = task;
  }

  moveTask(task: Task, newStatus: string) {
    task.status = newStatus;
    this.saveTasksToLocalStorage();
  }

  toggleAddTaskForm() {
    this.showAddTaskForm = !this.showAddTaskForm;
  }

  onTaskAdded(task: Task) {
    this.tasks.push(task);
    this.saveTasksToLocalStorage();
  }

  saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
