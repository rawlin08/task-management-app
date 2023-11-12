import { Component } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-board',
  template: `
  <app-empty-board *ngIf="app.boardEmpty == true"></app-empty-board>
  <div *ngIf="app.boardEmpty == false" class="board">
    <div class="column" *ngFor="let column of app.currentBoard.columns">
      <div class="columnName">
        <div class="color"></div>
        <h3>{{ column.name }} ({{ column.tasks.length }})</h3>
      </div>
      <div class="tasks">
        <div class="taskCard" (click)="selectTask(task)" *ngFor="let task of column.tasks">
          <h4>{{ task.title }}</h4>
          <p>0 of {{ task.subtasks.length }} subtasks</p>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: [`
  app-empty-board {
    display: grid;
    align-self: center;
    justify-self: center;
    gap: 25px;
  }
  .board {
    display: flex;
    gap: 24px;
    overflow: scroll;
  }
  .column {
    min-width: 280px;
  }
  .columnName {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 0 0 24px 0;
  }
  h3 {
    color: var(--gray);
    font-size: 15px;
    letter-spacing: 2.4px;
    text-transform: uppercase;
    font-weight: 400;
  }
  .color {
    width: 15px;
    height: 15px;
    background-color: var(--purple);
    border-radius: 50%;
  }
  .taskCard {
    background-color: var(--dark-gray);
    border-radius: 8px;
    box-shadow: 0px 4px 6px 0px rgba(54, 78, 126, 0.10);
    padding: 23px 16px;
    margin: 0 0 20px 0;
  }
  .taskCard > h4 {
    font-size: 15px;
    font-weight: 700;
    margin: 0 0 8px 0;
  }
  .taskCard > p {
    font-size: 12px;
    color: var(--gray);
  }
  `]
})
export class BoardComponent {
  constructor(public app: AppComponent) {}

  selectTask(task:any) {
    console.log(task);
    this.app.currentTask = task;
  }
}
