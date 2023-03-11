import { Injectable } from '@angular/core';
import { Answer } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  answers: Answer[] = [];

  constructor() { }

  add(answer: Answer): void {
    if (this.answers.find(a => a.id === answer.id) == undefined) {
      this.answers.push(answer);
    }
  }

  set(answers: Answer[]): void {
    this.answers = answers;
  }

  getAnswers(): Array<Answer> {
    return this.answers;
  }
}
