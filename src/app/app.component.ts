import { Component, HostListener, OnInit } from '@angular/core';
import * as todoData from 'src/assets/data.json';

@Component({
  selector: 'app-root',
  template: `
  <mat-drawer-container class="example-container" [hasBackdrop]="false">
    <mat-drawer #drawer mode="side">
      <img class="logo" [src]="'assets/images/logo-light.svg'">
      <div class="boards">
        <h3>All Boards ({{ data.length }})</h3>
        <button (click)="changeCurrentBoard(board)" class="board" *ngFor="let board of data">
          <img src="assets/images/icon-board.svg" alt="">
          <p>{{ board.name }}</p>
        </button>
        <button class="createNewBoardBtn">
          <img class="boardIcon" src="assets/images/icon-board.svg" alt="">
          <p>+ Create New Board</p>
        </button>
      </div>
    </mat-drawer>
    <mat-drawer-content>
      <main>
        <app-heading></app-heading>
        <button mat-raised-button (click)="drawer.toggle()">Toggle drawer</button>
        <app-board></app-board>
      </main>
    </mat-drawer-content>
  </mat-drawer-container>
  <div class="mobile">
    <main>
      <app-heading></app-heading>
      <app-board></app-board>
    </main>
  </div>
  `,
  styles: [`
  mat-drawer-container {
    display: none;
  }
  .mobile {
    display: block;
  }

  /* TABLET STYLES */
  @media (min-width: 768px) {
    mat-drawer-container {
      display: block;
    }
    mat-drawer {
      background-color: var(--dark-gray);
      border-right: 1px solid var(--black4);
    }
    .mobile {
      display: none;
    }
    .logo {
      padding: 32px 26px 0 26px;
    }
    h3 {
      color: var(--gray);
      font-size: 12px;
      font-weight: 400;
      letter-spacing: 2.4px;
      text-transform: uppercase;
      margin: 54px 0 19px 26px;
    }
    .board, .createNewBoardBtn {
      display: flex;
      align-items: center;
      gap: 12px;
      color: var(--gray);
      width: 240px;
      border-radius: 0 28px 28px 0;
      padding: 0 26px;
      margin: 0 20px 0 0;
    }
    .createNewBoardBtn {
      padding: 0 10px 0 26px;
      color: var(--purple);
    }
    .board > p, .createNewBoardBtn > p {
      font-size: 15px;
      font-weight: 500;
      padding: 15px 0;
    }
    .selected {
      background-color: var(--purple);
      color: var(--white);
    }
  }

  /* DESKTOP STYLES */
  @media (min-width: 1281px) {
    
  }

  @media (hover: hover) {
    .board:hover {
      background-color: var(--white);
      color: var(--purple);
    }
    .createNewBoardBtn:hover {
      background-color: var(--white);

    }
  }
  `]
})
export class AppComponent implements OnInit {
  title = 'task-management-app';
  constructor() {}
  ngOnInit(): void {
    this.data = todoData;
    this.data = this.data.boards;
    this.currentBoard = this.data.find((board:any) => board.id == 1);
    console.log(this.data);
    console.log(this.currentBoard);
  }

  data:any;
  currentBoard:any;
  currentTask:any;
  boardEmpty:boolean = false;
  innerWidth:any;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = event.target.innerWidth;
    console.log(this.innerWidth);
    
  }

  changeCurrentBoard(board:any) {
    this.currentBoard = board;
    console.log(board);
  }
}
