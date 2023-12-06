import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-heading',
  template: `
  <div class="left">
    <img src="assets/images/logo-mobile.svg" alt="">
    <button class="boardName" mat-button (menuOpened)="this.chevronIcon = 'up'" (menuClosed)="this.chevronIcon = 'down'" [matMenuTriggerFor]="menu">{{ app.currentBoard.name }} <img class="chevronIcon" [src]="'assets/images/icon-chevron-' + this.chevronIcon + '.svg'" alt=""></button>
    <mat-menu class="menuStyles" xPosition="after" #menu="matMenu">
      <div class="boards">
        <h3 class="boardNumber">All Boards ({{ app.data.length }})</h3>
        <button (click)="app.changeCurrentBoard(board)" class="boardBtn" *ngFor="let board of app.data">
          <img src="assets/images/icon-board.svg" alt="">
          <p class="boardName">{{ board.name }}</p>
        </button>
        <button (click)="app.openNewBoardDialog()" class="createNewBoardBtn">
          <img class="boardIcon" src="assets/images/icon-board.svg" alt="">
          <p>+ Create New Board</p>
        </button>
      </div>
      <div class="themeToggleContainer">
        <img src="assets/images/icon-light-theme.svg" alt="">
        <label class="form-switch">
          <input type="checkbox">
          <i></i>
        </label>
        <img src="assets/images/icon-dark-theme.svg" alt="">
      </div>
    </mat-menu>
  </div>
  <div class="right">
    <button class="addTaskBtn" [disabled]="this.app.boardEmpty"><img src="assets/images/icon-add-task-mobile.svg" alt=""><span class="addNewText">Add New Task</span></button>
    <button [matMenuTriggerFor]="options"><img src="assets/images/icon-vertical-ellipsis.svg" alt=""></button>
    <mat-menu class="optionStyles" #options="matMenu">
      <div class="optionsBtns">
        <button class="editBoardBtn">Edit Board</button>
        <button (click)="app.openDeleteBoardDialog()" class="deleteBoardBtn">Delete Board</button>
      </div>
    </mat-menu>
  </div>
  `,
  styles: [`
  .editBoardBtn, .deleteBoardBtn {
    font-size: 13px;
    width: 160px;
    text-align: left;
  }
  .deleteBoardBtn {
    color: var(--red);
  }
  .optionsBtns {
    padding: 10px;
    display: grid;
    gap: 16px;
  }
  .left {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .right {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .addTaskBtn {
    background-color: var(--purple);
    border-radius: 20px;
    padding: 5px 20px;
  }
  .addTaskBtn:disabled {
    opacity: 0.25;
  }
  .left > button {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .right > button:last-child {
    padding: 3px 0 0 0;
  }
  .addNewText {
    display: none;
  }

  @media (min-width: 768px) {
    .boardName {
      font-size: 20px;
      font-weight: 600;
    }
    .chevronIcon {
      display: none;
    }
    .boardName:disabled {
      cursor: auto;
    }
    .left > img {
      display: none;
    }
    .addNewText {
      display: inline;
      font-size: 15px;
      font-weight: 600;
      margin: 0 0 0 10px;
    }
    .addTaskBtn {
      padding: 15px 25px;
      border-radius: 30px;
    }
  }

  /* DESKTOP STYLES */
  @media (min-width: 1281px) {
    .boardName {
      font-size: 24px;
    }
  }
  `]
})
export class HeadingComponent {
  constructor(public app: AppComponent, public dialog: MatDialog) {}

  chevronIcon:any = 'down';

  // Dialogs
  openNewTaskDialog() {
    this.dialog.open(newTaskDialog);
  }
}

@Component({
  selector: 'new-task-dialog',
  templateUrl: './templates/new-task-dialog.html',
  standalone: true,
  imports: [MatDialogModule],
})
export class newTaskDialog {
  constructor() {}
}