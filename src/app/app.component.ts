import { Component, HostListener, OnInit } from '@angular/core';
import * as todoData from 'src/assets/data.json';

@Component({
  selector: 'app-root',
  template: `
  <mat-drawer-container class="example-container" [hasBackdrop]="false">
    <mat-drawer #drawer mode="side">I'm a drawer</mat-drawer>
    <mat-drawer-content>
      <button mat-raised-button (click)="drawer.toggle()">Toggle drawer</button>
      <main>
        <app-heading></app-heading>
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
    .mobile {
      display: none;
    }
  }

  /* DESKTOP STYLES */
  @media (min-width: 1281px) {

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
  }

  changeCurrentBoard(board:any) {
    this.currentBoard = board;
    console.log(board);
  }
}
