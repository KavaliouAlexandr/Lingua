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
        name: 'Poziom A1',
        description:
          'Na poziomie A1 znajdziesz solidne fundamenty do rozpoczęcia swojej przygody z nowym językiem! Jest to idealna opcja dla całkowitych początkujących, którzy dopiero zaczynają swoją podróż z językiem obcym.',
        startTime: new Date(),
        duration: '',
        estimatedDuration: '1 miesiąć',
        totalHours: 0,
        people: []
      },
      {
        id: '2',
        name: 'Poziom A2',
        description:
          'Poziom A2 to kolejny krok w Twojej nauce języka, oferujący kontynuację fundamentów, które zdobyłeś/aś na poziomie A1. Jest to idealny poziom dla osób, które już posiadają pewne podstawy językowe i chcą rozwijać swoje umiejętności komunikacyjne.',
        startTime: new Date(),
        duration: '',
        estimatedDuration: '',
        totalHours: 0,
        people: []
      },
      {
        id: '3',
        name: 'Poziom B1',
        description:
          'Poziom B1 to kluczowy etap w Twojej nauce języka, gdzie zyskasz większą swobodę w komunikacji oraz zdolność do porozumiewania się w różnorodnych sytuacjach. Jest to poziom, na którym możesz poczuć, że Twoje umiejętności językowe naprawdę rozwijają się.',
        startTime: new Date(),
        duration: '',
        estimatedDuration: '',
        totalHours: 0,
        people: []
      },
      {
        id: '4',
        name: 'Poziom B2',
        description:
          'Poziom B2 to etap, na którym Twoje umiejętności językowe stają się coraz bardziej wyrafinowane, a Ty sam/a zaczynasz czuć się coraz bardziej pewnie w komunikacji. To idealny moment, aby poszerzyć swoje horyzonty językowe i przekroczyć kolejną barierę w nauce.',
        startTime: new Date(),
        duration: '',
        estimatedDuration: '',
        totalHours: 0,
        people: []
      },
      {
        id: '5',
        name: 'Poziom C1',
        description:
          'Poziom C1 to etap, na którym stajesz się prawdziwie biegłym użytkownikiem języka, zdolnym do swobodnej komunikacji na różnorodne tematy oraz do zrozumienia złożonych tekstów.',
        startTime: new Date(),
        duration: '',
        estimatedDuration: '',
        totalHours: 0,
        people: []
      },
      {
        id: '6',
        name: 'Poziom C2',
        description:
          'Poziom C2 to najwyższy poziom znajomości języka, który oznacza doskonałą biegłość w komunikacji. Osoby na tym poziomie potrafią swobodnie posługiwać się językiem w każdym kontekście, zarówno w mowie, jak i piśmie.',
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
