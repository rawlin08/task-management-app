import { Component } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-board',
  template: `
  <app-empty-board *ngIf="app.boardEmpty == true"></app-empty-board>
  `,
  styles: [`
  app-empty-board {
    display: grid;
    padding: 0 20px;
    align-self: center;
    justify-self: center;
    gap: 25px;
  }
  `]
})
export class BoardComponent {
  constructor(public app: AppComponent) {}
}
