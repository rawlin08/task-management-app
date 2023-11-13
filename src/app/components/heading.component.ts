import { Component, Input } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-heading',
  template: `
  <div class="left">
    <img src="assets/images/logo-mobile.svg" alt="">
    <button class="boardName" [disabled]="app.innerWidth >= 768" mat-button (menuOpened)="this.chevronIcon = 'up'" (menuClosed)="this.chevronIcon = 'down'" [matMenuTriggerFor]="menu">{{ app.currentBoard.name }} <img class="chevronIcon" [src]="'assets/images/icon-chevron-' + this.chevronIcon + '.svg'" alt=""></button>
    <mat-menu class="menuStyles" xPosition="after" #menu="matMenu">
      <div class="boards">
        <h3 class="boardNumber">All Boards ({{ app.data.length }})</h3>
        <button (click)="app.changeCurrentBoard(board)" class="boardBtn" *ngFor="let board of app.data">
          <img src="assets/images/icon-board.svg" alt="">
          <p class="boardName">{{ board.name }}</p>
        </button>
        <button class="createNewBoardBtn">
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
    <button><img src="assets/images/icon-vertical-ellipsis.svg" alt=""></button>
  </div>
  `,
  styles: [`
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
  `]
})
export class HeadingComponent {
  constructor(public app: AppComponent) {}

  chevronIcon:any = 'down';
}
