import { Component } from '@angular/core';

@Component({
  selector: 'app-exercise2',
  templateUrl: './exercise2.component.html',
  styleUrls: ['./exercise2.component.scss']
})
export class Exercise2Component {
  sentence: string[] = ['Kot', 'jest', 'na', 'stole', 'i', 'pije', 'wodę'];
  shuffledSentence: string[] = [];
  droppedWords: string[] = [];

  constructor() {
    this.shuffledSentence = this.shuffleArray([...this.sentence]);
  }

  shuffleArray(array: any[]) {
    return array.sort(() => Math.random() - 0.5);
  }

  onDragStart(event: DragEvent) {
    event.dataTransfer?.setData('text/plain', (event.target as HTMLSpanElement).textContent || '');
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const data = event.dataTransfer?.getData('text/plain') || '';
    this.droppedWords.push(data);
    this.shuffledSentence = this.shuffledSentence.filter(word => word !== data);
  }

  checkSentence() {
    if (JSON.stringify(this.droppedWords) === JSON.stringify(this.sentence)) {
      alert('Correct!');
    } else {
      alert('Incorrect!');
    }
  }

  refreshTask() {
    this.shuffledSentence = this.shuffleArray([...this.sentence]);
    this.droppedWords = [];
  }
}
