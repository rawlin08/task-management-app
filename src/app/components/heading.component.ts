import { Component } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-heading',
  template: `
  <div class="left">
    <img src="assets/images/logo-mobile.svg" alt="">
    <button mat-button (menuOpened)="this.chevronIcon = 'up'" (menuClosed)="this.chevronIcon = 'down'" [matMenuTriggerFor]="menu">{{ app.currentBoard.name }} <img class="chevronIcon" [src]="'assets/images/icon-chevron-' + this.chevronIcon + '.svg'" alt=""></button>
    <mat-menu xPosition="after" #menu="matMenu">
      <button (click)="app.changeCurrentBoard(board)" *ngFor="let board of app.data" mat-menu-item>{{ board.name }}</button>
    </mat-menu>
  </div>
  <div class="right">
    <button class="addTaskBtn" [disabled]="this.app.boardEmpty"><img src="assets/images/icon-add-task-mobile.svg" alt=""></button>
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
  `]
})
export class HeadingComponent {
  constructor(public app: AppComponent) {}
  
  chevronIcon:any = 'down';
}
