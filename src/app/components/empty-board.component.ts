import { Component } from '@angular/core';

@Component({
  selector: 'app-empty-board',
  template: `
  <p>This board is empty. Create a new column to get started.</p>
  <button>+ Add New Column</button>
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

}
