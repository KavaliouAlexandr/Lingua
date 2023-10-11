import { Component, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Output() authEvent = new EventEmitter<boolean>();

  user: User = {
    id: '',
    login: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'developer',
    securityQuestion: '',
    securityAnswer: ''
  };

  invalidLogin: boolean = false;

  constructor(private router: Router) {
    this.user.role = 'developer'; // Ustaw domyślną wartość dla roli
  }

  setAuth() {
    // Przejdź do formularza rejestracji
    this.authEvent.emit(false);
  }

  loginUser() {
    // Logika logowania użytkownika
    console.log('Login:', this.user.login);
    console.log('Password:', this.user.password);
    console.log('Zalogowano!');

    // Sprawdź dane logowania
    const accountsJSON = localStorage.getItem('accounts');
    const accounts: any[] = accountsJSON ? JSON.parse(accountsJSON) : [];

    const allUsers = [
      ...accounts,
      { id: '1', login: 'admin', password: 'admin', role: 'admin' },
      { id: '2', login: 'devops', password: 'devops', role: 'devops' },
      { id: '3', login: 'developer', password: 'developer', role: 'developer' }
    ];

    const foundUser = allUsers.find(
      (user) => user.login === this.user.login && user.password === this.user.password
    );

    if (foundUser) {
      // Użytkownik został zalogowany pomyślnie
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('userRole', foundUser.role);
      localStorage.setItem('loggedInUserId', foundUser.id); // Dodaj tę linię do zapisu identyfikatora zalogowanego użytkownika
      this.router.navigate(['/projects']);
      this.authEvent.emit(true); // Emitowanie zdarzenia autoryzacji
    } else {
      // Nieprawidłowe dane logowania
      this.invalidLogin = true;
      console.log('Nieprawidłowe dane logowania');
    }
  }
}  