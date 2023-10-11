import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent {
  @Input() project?: Project;
  @Output() projectUpdated = new EventEmitter<Project>();
  @Output() cancel = new EventEmitter<void>();

  submitForm() {
    if (this.project) {
      this.projectUpdated.emit(this.project);
    }
  }

  get projectName(): string | undefined {
    return this.project?.name;
  }

  set projectName(name: string | undefined) {
    if (this.project) {
      this.project.name = name ?? ''; // Assign an empty string if `name` is undefined
    }
  }

  get projectDescription(): string | undefined {
    return this.project?.description;
  }

  set projectDescription(description: string | undefined) {
    if (this.project) {
      this.project.description = description ?? ''; // Assign an empty string if `description` is undefined
    }
  }
}
