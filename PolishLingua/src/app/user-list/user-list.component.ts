import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: any[] = []; // Przykładowa tablica użytkowników, wymaga dostosowania do twoich potrzeb
  userRole: string; // Rola użytkownika
  loggedInUserId: string; // Identyfikator zalogowanego użytkownika

  constructor() {
    // Odczytaj rolę użytkownika z localStorage
    this.userRole = localStorage.getItem('userRole')!;
    // Odczytaj identyfikator zalogowanego użytkownika z localStorage
    this.loggedInUserId = localStorage.getItem('loggedInUserId')!;
  }

  ngOnInit() {
    this.getUsersFromLocalStorage();
  }

  editUser(user: any) {
    // Logika obsługi edycji użytkownika tylko dla roli "Admin" lub zalogowanego użytkownika
    if (this.userRole === 'Admin' || user.id === this.loggedInUserId) {
      user.editMode = true;
    } else {
      console.log('Brak uprawnień do edycji użytkownika');
    }
  }


  saveUser(user: any) {
    // Logika zapisywania użytkownika
    user.editMode = false;
    console.log('Zapisano użytkownika:', user);

    // Aktualizacja danych użytkownika w tablicy users
    const updatedUser = {
      id: user.id,
      login: user.login,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      password: user.password // Zaktualizuj hasło
    };

    const accountsJSON = localStorage.getItem('accounts');
    const accounts: any[] = accountsJSON ? JSON.parse(accountsJSON) : [];

    // Znajdź indeks użytkownika w tablicy accounts
    const index = accounts.findIndex(account => account.id === user.id);

    if (index !== -1) {
      // Zaktualizuj dane użytkownika w tablicy accounts
      accounts[index] = updatedUser;

      // Zapisz zaktualizowaną tablicę


      // Zapisz zaktualizowaną tablicę accounts w localStorage
      localStorage.setItem('accounts', JSON.stringify(accounts));
    } else {
      console.log('Nie znaleziono użytkownika o podanym identyfikatorze');
    }
  }

  cancelEdit(user: any) {
    // Logika anulowania edycji użytkownika
    user.editMode = false;
    console.log('Anulowano edycję użytkownika:', user);
  }

  getUsersFromLocalStorage() {
    const accountsJSON = localStorage.getItem('accounts');
    const accounts: any[] = accountsJSON ? JSON.parse(accountsJSON) : [];

    this.users = accounts.map(account => ({
      id: account.id,
      login: account.login,
      firstName: account.firstName,
      lastName: account.lastName,
      role: account.role,
      password: account.password,
      editMode: false // Dodajemy pole editMode do oznaczenia, czy użytkownik jest w trybie edycji
    }));
  }
}
