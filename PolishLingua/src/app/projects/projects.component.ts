import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project.model';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  showAddForm = false;
  editMode = false;
  editedProjectIndex: number | null = null;

  editedProject: Project = {
    id: '',
    name: '',
    description: '',
    startTime: new Date(),
    duration: '',
    estimatedDuration: '',
    totalHours: 0,
    people: []
  };

  isAdmin = false;
  isDevOps = false;
  userRole: string | null = null;

  constructor(private router: Router) { }

  ngOnInit() {
    this.checkUserRole();
    this.loadProjectsFromLocalStorage();
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    this.editMode = false;
    this.clearEditedProject();
  }

  addProject(project: Project) {
    project.id = uuidv4();
    this.projects.push(project);
    this.saveProjectsToLocalStorage();
    this.showAddForm = false;
  }

  deleteProject(index: number) {
    this.projects.splice(index, 1);
    this.saveProjectsToLocalStorage();
  }

  editProject(project: Project, index: number) {
    if (this.isAdmin && (this.isDevOps || !this.isDevOps)) {
      this.editMode = true;
      this.editedProjectIndex = index;
      this.editedProject = { ...project };
      this.showAddForm = true;
    } else {
      console.log('Insufficient permissions to edit the project.');
    }
  }

  updateProject() {
    if (this.isAdmin && (this.isDevOps || !this.isDevOps)) {
      if (this.editedProjectIndex !== null) {
        this.projects[this.editedProjectIndex] = { ...this.editedProject };
        this.saveProjectsToLocalStorage();
        this.showAddForm = false;
        this.clearEditedProject();
      }
    } else {
      console.log('Insufficient permissions to update the project.');
    }
  }

  private saveProjectsToLocalStorage() {
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }

  private loadProjectsFromLocalStorage() {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      try {
        this.projects = JSON.parse(savedProjects);
        console.log('Projects loaded from localStorage:', this.projects);
      } catch (error) {
        console.error('Error parsing project data from localStorage:', error);
        this.projects = this.getDefaultProjects();
      }
    } else {
      this.projects = this.getDefaultProjects();
    }
  }

  private getDefaultProjects(): Project[] {
    return [
      {
        id: '1',
        name: 'Project A',
        description:
          'Mauris a ex hendrerit, bibendum lectus non, auctor neque. Fusce ut lorem ante. Morbi blandit purus gravida turpis dapibus rutrum.',
        startTime: new Date(),
        duration: '',
        estimatedDuration: '',
        totalHours: 0,
        people: []
      },
      {
        id: '2',
        name: 'Project B',
        description:
          'Mauris a ex hendrerit, bibendum lectus non, auctor neque. Fusce ut lorem ante. Morbi blandit purus gravida turpis dapibus rutrum.',
        startTime: new Date(),
        duration: '',
        estimatedDuration: '',
        totalHours: 0,
        people: []
      },
      {
        id: '3',
        name: 'Project C',
        description:
          'Mauris a ex hendrerit, bibendum lectus non, auctor neque. Fusce ut lorem ante. Morbi blandit purus gravida turpis dapibus rutrum.',
        startTime: new Date(),
        duration: '',
        estimatedDuration: '',
        totalHours: 0,
        people: []
      }
    ];
  }

  private clearEditedProject() {
    this.editedProjectIndex = null;
    this.editedProject = {
      id: '',
      name: '',
      description: '',
      startTime: new Date(),
      duration: '',
      estimatedDuration: '',
      totalHours: 0,
      people: []
    };
  }

  workOnProject(projectId: string) {
    localStorage.setItem('projectId', projectId);
    this.router.navigate(['/functionality', projectId]);
  }

  private checkUserRole() {
    this.userRole = localStorage.getItem('userRole');

    if (this.userRole === 'Admin') {
      this.isAdmin = true;
      this.isDevOps = true;
    } else if (this.userRole === 'DevOps') {
      this.isDevOps = true;
    }
  }
}
