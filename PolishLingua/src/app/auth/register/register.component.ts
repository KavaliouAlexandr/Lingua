import { Component, Output, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @Output() authEvent = new EventEmitter<boolean>();

  login: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  roles: string[] = ['Admin', 'Devops', 'Developer']; // Lista dostępnych ról
  securityQuestion: string = '';
  securityAnswer: string = '';

  constructor(
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) { }

  register() {
    console.log('Rejestracja...');
    console.log('Login:', this.login);
    console.log('Hasło:', this.password);
    console.log('Imię:', this.firstName);
    console.log('Nazwisko:', this.lastName);

    // Sprawdź, czy konto o podanym loginie już istnieje w localStorage
    const accounts: any[] = this.storage.get('accounts') || [];
    const foundAccount = accounts.find((account: any) => account.login === this.login);

    if (foundAccount) {
      console.log('Konto o podanym loginie już istnieje');
      return;
    }

    // Generuj unikalny identyfikator dla nowego użytkownika
    const userId = Date.now().toString();

    // Dodaj nowe konto do localStorage
    const newAccount = {
      id: userId,
      login: this.login,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      role: 'developer', // Ustaw rolę na "Developer"
      securityQuestion: this.securityQuestion, // Dodaj pytanie pomocnicze
      securityAnswer: this.securityAnswer // Dodaj odpowiedź na pytanie pomocnicze
    };


    accounts.push(newAccount);
    this.storage.set('accounts', accounts);
    console.log('Dodano nowe konto');

    // Dodaj nowego użytkownika do listy `validUsers`
    const validUsersJSON = localStorage.getItem('validUsers');
    const validUsers: any[] = validUsersJSON ? JSON.parse(validUsersJSON) : [];
    validUsers.push({ id: userId, login: newAccount.login, password: newAccount.password, role: newAccount.role });
    localStorage.setItem('validUsers', JSON.stringify(validUsers));
    console.log('Dodano nowego użytkownika do listy validUsers');

    // Ustaw nowo zarejestrowanego użytkownika jako zalogowanego
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('userRole', newAccount.role);
    localStorage.setItem('loggedInUserId', userId);

    this.router.navigate(['/projects']);
    this.authEvent.emit(true); // Emitowanie zdarzenia autoryzacji
  }

  changePasswordWithSecurityQuestion() {
    const accounts: any[] = this.storage.get('accounts') || [];
    const foundAccount = accounts.find((account: any) => account.login === this.login);

    if (!foundAccount) {
      console.log('Nie znaleziono konta o podanym loginie');
      return;
    }

    // Sprawdź odpowiedź na pytanie pomocnicze
    if (foundAccount.securityAnswer !== this.securityAnswer) {
      console.log('Nieprawidłowa odpowiedź na pytanie pomocnicze');
      return;
    }

    // Zmień hasło
    foundAccount.password = this.password;
    this.storage.set('accounts', accounts);
    console.log('Hasło zostało zmienione');

    // Przejdź do strony logowania
    this.router.navigate(['/login']);
  }


  setAuth() {
    this.authEvent.emit(false);
  }
}
