import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { MatDialog } from '@angular/material/dialog';
import { NewColumnDialogComponent } from './dialogs/new-column-dialog.component';

@Component({
  selector: 'app-board',
  template: `
  <app-empty-board *ngIf="app.boardEmpty == true"></app-empty-board>
  <div cdkDropListGroup *ngIf="app.boardEmpty == false" class="board">
    <div class="column" *ngFor="let column of app.currentBoard.columns">
      <div class="columnName">
        <div class="color"></div>
        <h3>{{ column.name }} ({{ column.tasks.length }})</h3>
      </div>
      <div cdkDropList [cdkDropListData]="column.tasks" (cdkDropListDropped)="app.drop($event)" class="tasks">
        <div [cdkDragData]="task" [cdkDragStartDelay]="200" cdkDrag class="taskCard" (click)="app.openViewTaskDialog(task)" *ngFor="let task of column.tasks">
          <h4>{{ task.title }}</h4>
          <p>{{ task.subtasks.length == 0 ? 'No Subtasks Available' : getCompleted(task) + ' of ' + task.subtasks.length + ' subtasks' }}</p>
        </div>
      </div>
    </div>
    <button (click)="openNewColumnDialog()" class="newColumnContainer">+ New Column</button>
  </div>
  `,
  styles: [`
  .tasks {
    min-height: 100%;
  }
  .newColumnContainer {
    display: grid;
    place-content: center;
    border-radius: 6px;
    background: linear-gradient(180deg, rgba(43, 44, 55, 0.25) 0%, rgba(43, 44, 55, 0.13) 100%);
    min-width: 280px;
    margin: 39px 0 0 0;
    height: 100%;
    font-size: 24px;
    color: var(--gray);
  }
  .column {
    min-width: 280px;
    max-width: 280px;
  }
  app-empty-board {
    display: grid;
    align-self: center;
    justify-self: center;
    gap: 25px;
  }
  .board {
    display: flex;
    gap: 24px;
    overflow: auto;
    padding: 24px;
  }
  .columnName {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 0 0 24px 0;
  }
  h3 {
    color: var(--gray);
    font-size: 12px;
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
    background-color: var(--card-background-color);
    border-radius: 8px;
    box-shadow: 0px 4px 6px 0px rgba(54, 78, 126, 0.10);
    padding: 23px 16px;
    margin: 0 0 20px 0;
    max-width: 280px;
  }
  .taskCard > h4 {
    font-size: 15px;
    font-weight: 700;
    margin: 0 0 8px 0;
    transition: all 0.1s ease-in-out;
  }
  .taskCard > p {
    font-size: 12px;
    color: var(--gray);
  }

  @media (hover: hover) {
    .newColumnContainer:hover {
      background-color: hsla(220, 69%, 97%, 0.1);
      transition: all .1s ease-in-out;
      color: var(--purple);
    }
    .taskCard:hover {
      cursor: pointer;
    }
    .taskCard:hover > h4 {
      color: var(--purple);
      transition: all 0.1s ease-in-out;
    }
  }
  `]
})
export class BoardComponent {
  constructor(public app: AppComponent, public dialog: MatDialog) {}

  getCompleted(task:any) {
    let completed = task.subtasks.filter((subtask:any) => subtask.isCompleted == true);
    return completed.length
  }

  openNewColumnDialog() {
    let newColumnDialogRef = this.dialog.open(NewColumnDialogComponent, {
      data: this.app.currentBoard
    })

    newColumnDialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result == 'create') {
        this.app.data = JSON.parse(localStorage.getItem('boards')!);
        this.app.currentBoard = this.app.data.find((board:any) => board.id == this.app.currentBoard.id);
      }
    });
  };
}
