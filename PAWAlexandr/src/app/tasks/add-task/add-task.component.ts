import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';
import { Functionality } from '../../models/functionality.model';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  @Input() functionalities: Functionality[] = [];
  @Output() taskAdded: EventEmitter<Task> = new EventEmitter<Task>();

  newTaskName = '';
  newTaskDescription = '';
  newTaskPriority = '';
  newTaskFunctionality: string | null = null;
  newTaskEstimatedTime = '';
  newTaskStatus = 'todo';
  newTaskStartDate: Date | undefined;
  newTaskEndDate: Date | undefined;
  newTaskAssignedUser = '';

  ngOnInit() {
    if (this.functionalities.length > 0) {
      this.newTaskFunctionality = this.functionalities[0].id;
    }
  }

  addTask() {
    const functionality = this.getFunctionalityById(this.newTaskFunctionality);

    if (!functionality) {
      console.error('Nie znaleziono funkcjonalności o podanym identyfikatorze.');
      return;
    }

    const newTask: Task = {
      id_task: functionality.id, // Przypisanie wartości id z funkcjonalności do id_task w zadaniu
      name: this.newTaskName,
      description: this.newTaskDescription,
      priority: this.newTaskPriority,
      functionality: {
        id: functionality.id,
        name: functionality.name,
        description: functionality.description,
        priority: functionality.priority,
        project: functionality.project,
        owner: functionality.owner,
        status: functionality.status,
        tasks: functionality.tasks
      },
      estimatedTime: this.newTaskEstimatedTime,
      status: this.newTaskStatus,
      startDate: this.newTaskStartDate instanceof Date ? this.newTaskStartDate.toISOString() : undefined,
      endDate: this.newTaskEndDate instanceof Date ? this.newTaskEndDate.toISOString() : undefined,
      assignedUser: this.newTaskAssignedUser,
      showDetails: false
    };

    // Zapisz nowe zadanie do localStorage
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    this.taskAdded.emit(newTask);
    this.resetForm();
  }

  private getFunctionalityById(functionalityId: string | null): Functionality | undefined {
    if (functionalityId === null) {
      return undefined;
    }
    return this.functionalities.find(functionality => functionality.id === functionalityId);
  }

  private resetForm() {
    this.newTaskName = '';
    this.newTaskDescription = '';
    this.newTaskPriority = '';
    this.newTaskFunctionality = this.functionalities.length > 0 ? this.functionalities[0].id : null;
    this.newTaskEstimatedTime = '';
    this.newTaskStatus = 'todo';
    this.newTaskStartDate = undefined;
    this.newTaskEndDate = undefined;
    this.newTaskAssignedUser = '';
  }

  private generateId() {
    return 'ID_' + Math.random().toString(36).substr(2, 9);
  }
}
