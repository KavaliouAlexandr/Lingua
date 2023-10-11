import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PAWTODO';
  loggedIn: boolean = false; // Dodaj tę właściwość
  onAuthEvent(loggedIn: boolean) {
    this.loggedIn = loggedIn;
  }
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  ngOnInit() {
    const accountList = [
      {
        id: '1',
        login: 'admin',
        password: 'admin',
        firstName: 'Sanya',
        lastName: 'Kavaliou',
        role: 'Admin'
      },
      {
        id: '2',
        login: 'devops',
        password: 'devops',
        firstName: 'Matvii',
        lastName: 'Zakrewski',
        role: 'DevOps'
      },
      {
        id: '3',
        login: 'developer',
        password: 'developer',
        firstName: 'Ryszard',
        lastName: 'TheBest',
        role: 'Developer'
      }
    ];

    // Sprawdź, czy dane już istnieją w localStorage
    const localStorageAccounts: any[] = this.storage.get('accounts') || [];

    // Jeśli dane jeszcze nie istnieją, zapisz je do localStorage
    if (localStorageAccounts.length === 0) {
      this.storage.set('accounts', accountList);
    }
  }
}
