import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-add-functionality',
  templateUrl: './add-functionality.component.html',
  styleUrls: ['./add-functionality.component.scss']
})
export class AddFunctionalityComponent {
  @Output() functionalityAdded = new EventEmitter<any>();

  newFunctionality = {
    id: '',
    name: '',
    description: '',
    priority: 'Wysoki', // Dodaj priorytet tutaj
    projectId: '',
    owner: '',
    status: 'todo'
  };

  constructor() {
    this.loadProjectIdFromLocalStorage();
    this.loadLoggedInUser();
  }

  loadProjectIdFromLocalStorage() {
    const projectId = localStorage.getItem('projectId');
    if (projectId) {
      this.newFunctionality.projectId = projectId;
    }
  }

  loadLoggedInUser() {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    const accountsJSON = localStorage.getItem('accounts');
    const accounts: any[] = accountsJSON ? JSON.parse(accountsJSON) : [];

    const user = accounts.find(account => account.id === loggedInUserId);
    if (user) {
      this.newFunctionality.owner = user.id; // Przypisanie ID użytkownika do funkcjonalności
    } else {
      console.log('Użytkownik nie jest zalogowany');
    }
  }

  getUserById(userId: string): User | undefined {
    // Pobierz użytkowników z localStorage lub z innego źródła danych
    const usersJSON = localStorage.getItem('users');
    const users: User[] = usersJSON ? JSON.parse(usersJSON) : [];

    // Znajdź użytkownika o podanym identyfikatorze
    return users.find(user => user.id === userId);
  }

  onSubmit() {
    this.newFunctionality.id = this.generateId();
    const projectId = localStorage.getItem('projectId');
    if (projectId) {
      this.newFunctionality.projectId = projectId;
      this.functionalityAdded.emit(this.newFunctionality);
      this.resetForm();
    } else {
      console.log('Nie wybrano projektu. Nie można dodać funkcjonalności.');
    }
  }

  generateId() {
    return 'ID_' + Math.random().toString(36).substr(2, 9);
  }

  resetForm() {
    this.newFunctionality = {
      id: '',
      name: '',
      description: '',
      priority: '',
      projectId: '',
      owner: '',
      status: 'todo'
    };
  }

  get showAddFunctionality() {
    return true;
  }
}
