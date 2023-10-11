import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent {
  @Input() task!: Task;
  @Output() cancelEdit = new EventEmitter<void>();
  @Output() updateTask = new EventEmitter<Task>();

  saveChanges() {
    this.updateTask.emit(this.task);
  }
}
