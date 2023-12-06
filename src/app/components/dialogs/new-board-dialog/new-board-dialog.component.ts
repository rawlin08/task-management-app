import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

// Interfaces
export interface newBoardData {
  title:any,
  boardColumns:any
}
export interface editBoardData {
  title:any,
  boardColumns:any
}

@Component({
  selector: 'app-new-board-dialog',
  providers: [],
  template: `
  <div class="dialog">
    <h3>Add New Board</h3>
    <div class="name input">
      <label for="name">Board Name</label>
      <input #boardName placeholder="e.g. Web Design" id="name" name="name" type="text">
    </div>
    <div #columnNames class="columns input">
      <label>Board Columns</label>
      <div *ngFor="let column of newBoard.columns">
        <input id="description" name="description" type="text">
        <button (click)="deleteColumn(column.id)"><img src="assets/images/icon-cross.svg" alt=""></button>
      </div>
    </div>
    <div class="buttons">
      <button (click)="addColumn()">+ Add New Column</button>
      <button mat-dialog-close (click)="createBoard(boardName, columnNames)">Create New Board</button>
    </div>
  </div>
  `,
  styles: [`
    .name {
        margin: 0 0 24px 0;
    }
    .columns {
        margin: 0 0 12px 0;
    }
    .columns > div {
        display: flex;
        justify-content: space-between;
        gap: 16px;
    }
    .buttons {
        display: grid;
        gap: 24px;
    }
    .buttons > button {
        font-size: 13px;
        font-weight: 500;
        border-radius: 20px;
        padding: 8px;
    }
    .buttons > button:first-child {
        background-color: var(--white);
        color: var(--purple);
    }
    .buttons > button:last-child {
        background-color: var(--purple);
        color: var(--white);
    }
    #description {
        width: 100%;
    }
  `]
})
export class NewBoardDialogComponent implements OnInit, OnDestroy {
  constructor() {}
  ngOnInit(): void {
    this.todoData = JSON.parse(localStorage.getItem('boards')!);
  }
  ngOnDestroy(): void {
    
  }

  todoData:any;
  newBoard:any = {
    columns: [
      {
      id: 1,
      content: ''
      }
    ]
  };
  board:any = {
    name: '',
    columns: []
  };

  createBoard(boardName:any, columnNames:any) {
    console.log(columnNames);
    columnNames.childNodes.forEach((element:any) => {
      if (element.childNodes[0]) {
        if (element.childNodes[0].nodeName != '#text') {
          if (this.board.columns.length != 0) {
            const columnIDs = this.board.columns.map((object:any) => {
              return object.id;
            });
            const maxID = Math.max(...columnIDs);
            this.board.columns.push({
              id: maxID + 1,
              name: element.childNodes[0].value,
              tasks: []
            });
          }
          else {
            this.board.columns.push({
              id: 1,
              name: element.childNodes[0].value,
              tasks: []
            });
          };
        };
      };
    });
    
    const boardIDs = this.todoData.map((object:any) => {
      return object.id;
    })
    const maxID = Math.max(...boardIDs);
    this.board.id = maxID + 1;
    this.board.name = boardName.value;
    this.todoData.push(this.board);
    console.log(this.todoData);
    this.updateLocalStorage();
    console.log(this.board);
  }
  updateLocalStorage() {
    localStorage.setItem('boards', JSON.stringify(this.todoData));
  }
  deleteColumn(columnID:any) {
    if (this.newBoard.columns.length != 1) {
      this.newBoard.columns = this.newBoard.columns.filter((column:any) => column.id != columnID);
    }
  }
  addColumn() {
    const columnIDs = this.newBoard.columns.map((object:any) => {
      return object.id;
    })
    console.log(columnIDs);
    const maxID = Math.max(...columnIDs);

    this.newBoard.columns.push({
      id: maxID + 1,
      content: ''
    })
  }
}
