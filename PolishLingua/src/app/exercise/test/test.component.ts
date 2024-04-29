import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  score: number = 0;
  totalQuestions: number = 0;
  strokeDashoffset: number = 251.2;

  constructor() { }

  ngOnInit(): void {
    this.score = Math.floor(Math.random() * 10) + 1;
    this.totalQuestions = 10;
    this.strokeDashoffset = 565.48 * (1 - this.score / this.totalQuestions);
  }

  restartTest() {
    window.location.reload();
  }
}
