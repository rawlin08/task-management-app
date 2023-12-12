import { Component, ViewEncapsulation } from '@angular/core';
import { AppComponent } from '../app.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-heading',
  encapsulation: ViewEncapsulation.None,
  template: `
  <div class="left">
    <img src="assets/images/logo-mobile.svg" alt="">
    <button [disabled]="app.innerWidth >= 768" class="boardName" mat-button (menuOpened)="this.chevronIcon = 'up'" (menuClosed)="this.chevronIcon = 'down'" [matMenuTriggerFor]="menu">{{ app.currentBoard.name }} <img class="chevronIcon" [src]="'assets/images/icon-chevron-' + this.chevronIcon + '.svg'" alt=""></button>
    <mat-menu class="menuStyles" xPosition="after" #menu="matMenu">
      <div class="boards">
        <h3 class="boardNumber">All Boards ({{ app.data.length }})</h3>
        <button [classList]="app.currentBoard.id == board.id ? 'boardBtn selected' : 'boardBtn'" (click)="app.changeCurrentBoard(board)" *ngFor="let board of app.data">
          <img src="assets/images/icon-board.svg" alt="">
          <p class="boardName">{{ board.name }}</p>
        </button>
        <button (click)="app.openNewBoardDialog()" class="createNewBoardBtn">
          <img class="boardIcon" src="assets/images/icon-board.svg" alt="">
          <p>+ Create New Board</p>
        </button>
      </div>
      <app-theme-toggle></app-theme-toggle>
    </mat-menu>
  </div>
  <div class="right">
    <button class="addTaskBtn" (click)="app.openNewTaskDialog()" [disabled]="this.app.data.length == 0"><img src="assets/images/icon-add-task-mobile.svg" alt=""><span class="addNewText">Add New Task</span></button>
    <button [matMenuTriggerFor]="options" [disabled]="this.app.data.length == 0"><img src="assets/images/icon-vertical-ellipsis.svg" alt=""></button>
    <mat-menu class="menuStyles" #options="matMenu">
      <div class="optionsBtns">
        <button (click)="app.openEditBoardDialog()" class="editBoardBtn">Edit Board</button>
        <button (click)="app.openDeleteBoardDialog()" class="deleteBoardBtn">Delete Board</button>
      </div>
    </mat-menu>
  </div>
  `,
  styles: [`
  .boardName {
    font-weight: 600;
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
    color: var(--white);
  }

  @media (min-width: 768px) {
    .boardName {
      font-size: 20px;
    }
    .boardName:disabled {
      cursor: auto;
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
}