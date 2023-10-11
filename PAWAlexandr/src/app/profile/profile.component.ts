import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { Functionality } from '../models/functionality.model';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  loggedInUser: User | undefined;
  userFunctionalities: Functionality[] = [];
  userTasks: Task[] = [];
  securityAnswer: string = '';
  securityAnswerCorrect: boolean = true;
  newPassword: string = '';
  confirmPassword: string = '';
  passwordChanged: boolean = false;

  firstName: string = '';
  lastName: string = '';
  role: string = '';

  constructor(private router: Router) {
    this.loggedInUser = this.getLoggedInUser();

    if (!this.loggedInUser) {
      this.router.navigate(['/login']);
    } else {
      this.getUserFunctionalities();
      this.getUserTasks();

      // Set user information
      this.firstName = this.loggedInUser.firstName;
      this.lastName = this.loggedInUser.lastName;
      this.role = this.loggedInUser.role;
    }
  }


  getLoggedInUser(): User | undefined {
    const accountsJSON = localStorage.getItem('accounts');
    const accounts: User[] = accountsJSON ? JSON.parse(accountsJSON) : [];

    const loggedInUserId = localStorage.getItem('loggedInUserId');
    const loggedInUser = accounts.find((user: User) => user.id === loggedInUserId);

    return loggedInUser ? loggedInUser : undefined;
  }


  getUserFunctionalities() {
    const accountsJSON = localStorage.getItem('accounts');
    const accounts: User[] = accountsJSON ? JSON.parse(accountsJSON) : [];

    const loggedInUserId = localStorage.getItem('loggedInUserId');
    const loggedInUser = accounts.find((user: User) => user.id === loggedInUserId);

    if (loggedInUser) {
      const userFunctionalities: Functionality[] = [];

      let index = 1;
      let key = 'functionalities_' + index;
      let functionalitiesJSON = localStorage.getItem(key);

      while (functionalitiesJSON) {
        const functionalities: Functionality[] = JSON.parse(functionalitiesJSON);
        userFunctionalities.push(...functionalities);

        index++;
        key = 'functionalities_' + index;
        functionalitiesJSON = localStorage.getItem(key);
      }

      this.userFunctionalities = userFunctionalities.filter((functionality: Functionality) => functionality.owner === loggedInUser.id);
    }
  }

  getUserTasks() {
    const tasksJSON = localStorage.getItem('tasks');
    const tasks: Task[] = tasksJSON ? JSON.parse(tasksJSON) : [];

    console.log('All tasks:', tasks);
    console.log('Logged in user:', this.loggedInUser);

    this.userTasks = tasks.filter((task: Task) => {
      const assignedUserRole = task.assignedUser.toLowerCase();
      const loggedInUserRole = this.loggedInUser?.role.toLowerCase();

      console.log('Assigned user role:', assignedUserRole);
      console.log('Logged in user role:', loggedInUserRole);

      const isAssignedToUser = assignedUserRole === loggedInUserRole;

      console.log('isAssignedToUser:', isAssignedToUser);

      return isAssignedToUser;
    });

    console.log('User tasks:', this.userTasks);
  }

  isSecurityAnswerValid(): boolean {
    return (
      this.securityAnswer.toLowerCase() ===
      this.loggedInUser?.securityAnswer.toLowerCase()
    );
  }

  validateSecurityAnswer() {
    this.securityAnswerCorrect = this.isSecurityAnswerValid();
  }

  updateUserInLocalStorage(user: User) {
    const accountsJSON = localStorage.getItem('accounts');
    const accounts = accountsJSON ? JSON.parse(accountsJSON) : [];

    const updatedAccounts = accounts.map((account: User) => {
      if (account.id === user.id) {
        return user;
      } else {
        return account;
      }
    });

    localStorage.setItem('accounts', JSON.stringify(updatedAccounts));
  }

  changePassword() {
    this.validateSecurityAnswer();

    if (!this.securityAnswerCorrect) {
      console.log('Podana odpowiedź na pytanie pomocnicze jest niepoprawna');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      console.log('Nowe hasło i potwierdzenie hasła nie pasują do siebie');
      return;
    }

    if (this.loggedInUser) {
      this.loggedInUser.password = this.newPassword;
      this.updateUserInLocalStorage(this.loggedInUser);
      this.passwordChanged = true;
    }
  }
}
