import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  projectId: string = '';
  project: Project | undefined;
  showEditSection: boolean = false;
  isEditing: boolean = false;
  userRole: string = ''; // User role
  isAdmin: boolean = false;
  isDevOps: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.projectId = params['id'];
      console.log('Wczytano szczegóły projektu o ID:', this.projectId);
      this.loadProjectDetails();
    });

    // Get the user role from localStorage
    this.userRole = localStorage.getItem('userRole') || '';

    // Check if the user has the "admin" or "devops" role
    this.isAdmin = this.userRole === 'admin';
    this.isDevOps = this.userRole === 'devops';
  }


  private loadProjectDetails() {
    const projects: Project[] = JSON.parse(localStorage.getItem('projects') || '[]');
    const project = JSON.parse(JSON.stringify(projects.find(p => p.id === this.projectId)));
    if (project) {
      this.project = project;
    }
  }

  canEdit(): boolean {
    // Check if the user has edit permissions (e.g., based on their role)
    return this.userRole === 'devops' || this.userRole === 'admin';
  }

  editProject() {
    if (this.canEdit()) {
      this.showEditSection = true;
      this.isEditing = true;
    }
  }

  updateProject(updatedProject: Project) {
    if (this.canEdit()) {
      const projects: Project[] = JSON.parse(localStorage.getItem('projects') || '[]');
      const projectIndex = projects.findIndex(p => p.id === this.projectId);
      if (projectIndex !== -1) {
        projects[projectIndex] = updatedProject;
        localStorage.setItem('projects', JSON.stringify(projects));
        this.isEditing = false; // Set isEditing to false after updating the project
        this.showEditSection = false; // Hide the edit section
      }
    }
  }
}
