import { Component, OnInit } from '@angular/core';
import { Functionality } from '../models/functionality.model';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-functionality',
  templateUrl: './functionality.component.html',
  styleUrls: ['./functionality.component.scss']
})
export class FunctionalityComponent implements OnInit {
  functionalities: Functionality[] = [];
  showAddTask: boolean = false;

  selectedFunctionality: Functionality | null = null;
  showAddFunctionality = false;
  tasks: Task[] = [];
  accounts: any[] = [];
  loggedInUser: any = { role: 'Admin' };
  projectName: string | null = null; // Declare projectName property

  canAddFunctionality(): boolean {
    const role = this.loggedInUser?.role.toLowerCase();
    return role === 'admin' || role === 'devops';
  }

  isAdmin = false;
  isDevOps = false;
  userRole: string | null = null;

  ngOnInit() {
    this.loadFunctionalities();
    this.loadAccounts();
    this.checkUserRole();
    this.loadProjectName(); // Call the function to load the project name
  }

  loadProjectName() {
    const projectId = localStorage.getItem('projectId');
    if (projectId) {
      const projects = localStorage.getItem('projects');
      if (projects) {
        const parsedProjects = JSON.parse(projects);
        const project = parsedProjects.find((p: any) => p.id === projectId);
        if (project) {
          this.projectName = project.name;
        }
      }
    }
  }

  loadFunctionalities() {
    const projectId = localStorage.getItem('projectId');
    if (projectId) {
      const storedFunctionalities = localStorage.getItem(`functionalities_${projectId}`);
      if (storedFunctionalities) {
        this.functionalities = JSON.parse(storedFunctionalities);
        console.log('Loaded functionalities:', this.functionalities); // Add the log statement
      } else {
        this.functionalities = [];
        this.saveFunctionalities();
      }
    } else {
      console.log('Nie wybrano projektu. Nie można wczytać funkcjonalności.');
    }
  }


  saveFunctionalities() {
    const projectId = localStorage.getItem('projectId');
    if (projectId) {
      localStorage.setItem(`functionalities_${projectId}`, JSON.stringify(this.functionalities));
    } else {
      console.log('Nie wybrano projektu. Nie można zapisać funkcjonalności.');
    }
  }

  loadAccounts() {
    const storedAccounts = localStorage.getItem('accounts');
    if (storedAccounts) {
      this.accounts = JSON.parse(storedAccounts);
    }
  }

  saveAccounts() {
    localStorage.setItem('accounts', JSON.stringify(this.accounts));
  }

  selectFunctionality(functionality: Functionality) {
    this.selectedFunctionality = functionality;
    localStorage.setItem('selectedFunctionalityId', functionality.id); // Zapisz identyfikator funkcjonalności w LocalStorage
  }


  addFunctionality(newFunctionality: Functionality) {
    newFunctionality.tasks = [];
    this.functionalities.push(newFunctionality);
    this.saveFunctionalities();
    this.showAddFunctionality = false; // Ustaw showAddFunctionality na false
    this.selectedFunctionality = newFunctionality;
  }

  getFunctionalitiesByStatus(status: string) {
    return this.functionalities.filter(functionality => functionality.status === status);
  }

  getTasksByFunctionality(functionality: Functionality): Task[] {
    const tasksWithMatchingFunctionality = this.tasks.filter(task => task.id_task === functionality.id);
    return tasksWithMatchingFunctionality;
  }



  pracuj(functionality: Functionality) {
    console.log('Pracuj clicked for:', functionality);
    // Perform the desired action specific to the functionality
  }

  moveFunctionality(functionality: Functionality, status: string) {
    functionality.status = status;
    this.saveFunctionalities();
  }

  clearSelectedFunctionality() {
    this.selectedFunctionality = null;
  }

  addTask(newTask: Task) {
    if (this.selectedFunctionality) {
      const selectedAccountId = localStorage.getItem('selectedAccount');
      if (selectedAccountId) {
        const selectedAccount = this.accounts.find(account => account.id === selectedAccountId);
        if (selectedAccount) {
          newTask.functionality = {
            id: this.selectedFunctionality.id,
            name: this.selectedFunctionality.name,
            description: this.selectedFunctionality.description,
            priority: this.selectedFunctionality.priority,
            project: this.selectedFunctionality.project,
            owner: selectedAccount, // Przypisanie wybranej osoby do funkcjonalności
            status: this.selectedFunctionality.status,
            tasks: []
          };

          this.selectedFunctionality.tasks.push(newTask);
          this.saveFunctionalities();
        }
      }
    }
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
