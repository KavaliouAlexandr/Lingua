import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exercise3',
  templateUrl: './exercise3.component.html',
  styleUrls: ['./exercise3.component.scss']
})
export class Exercise3Component implements OnInit {
  isAnswerCorrect: boolean | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  selectAnswer(isTrue: boolean) {
    // Здесь можно добавить логику для проверки ответа
    this.isAnswerCorrect = isTrue;
  }
}
