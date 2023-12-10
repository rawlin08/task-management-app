import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as todoData from 'src/assets/data.json';
import { NewBoardDialogComponent } from './components/dialogs/new-board-dialog.component';
import { DeleteBoardDialogComponent } from './components/dialogs/delete-board-dialog.component';
import { ViewTaskDialogComponent } from './components/dialogs/view-task-dialog.component';
import { NewTaskDialogComponent } from './components/dialogs/new-task-dialog.component';
import { EditBoardDialogComponent } from './components/dialogs/edit-board-dialog.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  template: `
  <mat-drawer-container  class="example-container" [hasBackdrop]="false">
    <mat-drawer #drawer mode="side">
      <img class="logo" [src]="'assets/images/logo-light.svg'">
      <div class="boards">
        <h3>All Boards ({{ data.length }})</h3>
        <div class="boardsContainer">
          <button [classList]="currentBoard.id == board.id ? 'board selected' : 'board'" (click)="changeCurrentBoard(board)" *ngFor="let board of data">
            <img src="assets/images/icon-board.svg" alt="">
            <p>{{ board.name }}</p>
          </button>
          <button (click)="openNewBoardDialog()" class="createNewBoardBtn">
            <img class="boardIcon" src="assets/images/icon-board.svg" alt="">
            <p>+ Create New Board</p>
          </button>
        </div>
      </div>
      <div class="themeToggleContainer">
        <img src="assets/images/icon-light-theme.svg" alt="">
        <label class="form-switch">
          <input type="checkbox">
          <i></i>
        </label>
        <img src="assets/images/icon-dark-theme.svg" alt="">
      </div>
      <button class="active" mat-raised-button (click)="drawer.toggle()">
        <img src="assets/images/icon-hide-sidebar.svg" alt="">
        <p>Hide Sidebar</p>
      </button>
    </mat-drawer>
    <mat-drawer-content>
      <main>
        <app-heading></app-heading>
        <app-board></app-board>
      </main>
    </mat-drawer-content>
  </mat-drawer-container>
  <button class="inactive" mat-raised-button (click)="drawer.toggle()"><img src="assets/images/icon-show-sidebar.svg" alt=""></button>
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
  .inactive {
    display: none;
  }

  /* TABLET STYLES */
  @media (min-width: 768px) {
    .inactive {
      position: absolute;
      bottom: 53px;
      z-index: 1;
      display: block;
    }
    .inactive {
      background-color: var(--purple);
      border-radius: 0 100px 100px 0;
      padding: 15px;
    }
    mat-drawer-container {
      display: block;
    }
    mat-drawer {
      background-color: var(--dark-gray);
      border-right: 1px solid var(--black4);
      overflow-y: unset !important;
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
    .boardsContainer {
      height: calc(100vh - 340px);
      overflow: scroll;
    }
    .active {
      display: flex;
      align-items: center;
      gap: 15px;
      margin: 8px 20px 0 0;
      color: var(--gray);
      font-size: 15px;
      padding: 16px 32px;
      border-radius: 0 100px 100px 0;
      width: 240px;
    }
  }

  /* DESKTOP STYLES */
  @media (min-width: 1281px) {
    
  }

  @media (hover: hover) {
    .board:hover, .active:hover {
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
  constructor(public dialog: MatDialog, public newBoardDialog: NewBoardDialogComponent) {}
  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    
    // LOCAL STORAGE
    this.darkMode = JSON.parse(localStorage.getItem('theme')!);
    if (!this.darkMode) {
      this.darkMode = false;
      localStorage.setItem('theme', JSON.stringify(this.darkMode));
    }

    this.data = JSON.parse(localStorage.getItem('boards')!);
    if (!this.data) {
      let boards = todoData;
      localStorage.setItem('boards', JSON.stringify(boards.boards));
      this.data = boards.boards;
    }

    this.currentBoard = this.data.find((board:any) => board.id == 1);
    console.log(this.data);
    console.log(this.currentBoard);  
  }

  darkMode:any;
  data:any;
  currentBoard:any;
  currentTask:any;
  boardEmpty:boolean = false;
  innerWidth:any;
  sidebarOpened = {
    boolean: false,
  }

  toggleTheme() {
    if (this.darkMode == true) {
      this.darkMode = false;
    }
    else {
      this.darkMode = true;
    }
    localStorage.setItem('theme', JSON.stringify(this.darkMode));
  }

  // Dialogs
  openNewBoardDialog() {
    let newBoardDialogRef = this.dialog.open(NewBoardDialogComponent, {
      width: '100%',
    });

    newBoardDialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result == 'create') {
        this.data = JSON.parse(localStorage.getItem('boards')!);
        console.log(this.data);
        this.currentBoard = this.data.find((board:any) => board.id == this.data.length);
        console.log(this.currentBoard);
      }
    });
  };
  openEditBoardDialog() {
    let newBoardDialogRef = this.dialog.open(EditBoardDialogComponent, {
      width: '100%',
      data: this.currentBoard
    });

    newBoardDialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result == 'save') {
        this.data = JSON.parse(localStorage.getItem('boards')!);
        console.log(this.data);
        this.currentBoard = this.data.find((board:any) => board.id == this.currentBoard.id);
        console.log(this.currentBoard);
      }
    });
  }
  openDeleteBoardDialog() {
    let deleteBoardDialogRef = this.dialog.open(DeleteBoardDialogComponent, {
      width: '100%',
      data: this.currentBoard
    });

    deleteBoardDialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result == 'delete') {
        this.data = this.data.filter((board:any) => board.id != this.currentBoard.id);
        this.currentBoard = this.data[0];
        this.updateLocalStorage();
      }
    }); 
  };
  openViewTaskDialog(task:any) {
    console.log(task);
    this.currentTask = task;
    let viewTaskDialogRef = this.dialog.open(ViewTaskDialogComponent, {
      width: '100%',
      data: [this.currentTask, this.currentBoard]
    });

    viewTaskDialogRef.afterClosed().subscribe(result => {
      this.data = JSON.parse(localStorage.getItem('boards')!);
      this.currentBoard = this.data.find((board:any) => board.id == this.currentBoard.id);
    });
  }
  openNewTaskDialog() {
    let newTaskDialogRef = this.dialog.open(NewTaskDialogComponent, {
      width: '100%',
      data: this.currentBoard
    });

    newTaskDialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result == 'create') {
        this.data = JSON.parse(localStorage.getItem('boards')!);
        this.currentBoard = this.data.find((board:any) => board.id == this.currentBoard.id);
      }
    }); 
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = event.target.innerWidth;
    console.log(this.innerWidth);
  }

  drop(e:any) {
    console.log(e);
    if (e.previousContainer === e.container) {
      moveItemInArray(e.container.data, e.previousIndex, e.currentIndex);
    }
    else {
      transferArrayItem(
        e.previousContainer.data,
        e.container.data,
        e.previousIndex,
        e.currentIndex,
      );
    };
    let board = this.data.find((board:any) => board.id == this.currentBoard.id);
    let task:any = []
    board.columns.forEach((column:any) => {
      column.tasks.forEach((element:any) => {
        if (element.id == e.item.data.id) {
          task.push(element, column.name);
        }
      });
    });
    console.log(task);
    task[0].status = task[1];
    
    this.updateLocalStorage();
  }

  updateLocalStorage() {
    localStorage.setItem('boards', JSON.stringify(this.data));
  }
  changeCurrentBoard(board:any) {
    this.currentBoard = board;
    console.log(board);
  }
  toggleSidebar(drawer:any) {
    drawer.toggle();
  }
}