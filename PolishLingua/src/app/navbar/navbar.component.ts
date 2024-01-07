import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  loggedInUserId: any;

  constructor() {
    // Pobierz id zalogowanego użytkownika
    this.loggedInUserId = this.getLoggedInUserId();
  }

  getLoggedInUserId() {
    const loggedInUserId = localStorage.getItem('loggedInUserId');

    return loggedInUserId;
  }
}
