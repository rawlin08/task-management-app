import { Component } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-empty-board',
  template: `
  <p>You have no boards. Create a new board to get started.</p>
  <button (click)="this.app.openNewBoardDialog()">+ Create New Board</button>
  `,
  styles: [`
  p {
    color: var(--gray);
    text-align: center;
    font-size: 18px;
    font-weight: 500;
  }
  button {
    background-color: var(--purple);
    border-radius: 24px;
    padding: 15px 17px;
    font-weight: 500;
    justify-self: center;
  }

  @media (hover: hover) {
    button:hover {
      background-color: var(--light-purple);
    }
  }
  `]
})
export class EmptyBoardComponent {
  constructor(public app: AppComponent) {}
}
