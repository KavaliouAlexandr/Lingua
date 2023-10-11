import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  constructor(private router: Router) { }

  goToRegister() {
    this.router.navigate(['/auth'], { queryParams: { isAuth: 'true' } });
  }
}
