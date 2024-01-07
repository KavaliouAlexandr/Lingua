import { Component, EventEmitter, Output } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Project } from '../../models/project.model';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent {
  @Output() projectAdded = new EventEmitter<Project>();

  name: string = '';
  startTime: NgbDateStruct | null = null;
  estimatedDuration: string = '';
  description: string = '';

  constructor(private calendar: NgbCalendar) { }

  addProject() {
    if (this.name.trim() !== '' && this.startTime && this.estimatedDuration.trim() !== '' && this.description.trim() !== '') {
      const selectedDate = this.startTime ? new Date(this.startTime.year, this.startTime.month - 1, this.startTime.day) : null;
      const project: Project = {
        id: uuidv4(),
        name: this.name,
        startTime: selectedDate,
        estimatedDuration: this.estimatedDuration,
        description: this.description,
        duration: '',
        totalHours: 0,
        people: []
      };

      this.projectAdded.emit(project);
      this.clearForm();
    }
  }

  clearForm() {
    this.name = '';
    this.startTime = null;
    this.estimatedDuration = '';
    this.description = '';
  }
}
