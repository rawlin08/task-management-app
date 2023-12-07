import { Component, OnDestroy, OnInit } from '@angular/core';

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
    <mat-dialog-content>
      <form #form action="">
        <div class="name input">
          <label for="name">Board Name</label>
          <input #boardName placeholder="e.g. Web Design" id="name" name="name" type="text">
        </div>
        <div #columnNames class="columns input">
          <label>Board Columns</label>
          <div *ngFor="let column of newBoard.columns">
            <input id="description" name="description" type="text">
            <button type="button" (click)="deleteColumn(column.id)"><img src="assets/images/icon-cross.svg" alt=""></button>
          </div>
        </div>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button type="button" (click)="addColumn()">+ Add New Column</button>
      <button mat-dialog-close="create" (click)="createBoard($event, form)">Create New Board</button>
    </mat-dialog-actions>
  </div>
  `,
  styles: [`
    .columns > div {
      display: flex;
      justify-content: space-between;
      gap: 16px;
    }
    mat-dialog-content {
      padding: 0 0 12px 0 !important;
    }
    mat-dialog-actions {
      display: flex;
      flex-direction: column;
      gap: 24px;
      padding: 0 !important;
    }
    mat-dialog-actions > button {
      font-size: 13px;
      font-weight: 500;
      border-radius: 20px;
      padding: 8px;
      width: 100%;
    }
    mat-dialog-actions > button:first-child {
      background-color: var(--white);
      color: var(--purple);
    }
    mat-dialog-actions > button:last-child {
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

  createBoard(e:Event, formElements:any) {
    e.preventDefault();
    let form:any[] = Object.values(formElements.elements);
    let columnNames = form.filter((element:any) => element.id == 'description');

    console.log(Object.values(formElements.elements));
    console.log(columnNames);

    let columns:any[] = [];
    columnNames.forEach((element:any) => {
      if (this.board.columns.length != 0) {
        const columnIDs = this.board.columns.map((object:any) => {
          return object.id;
        });
        const maxID = Math.max(...columnIDs);
        columns.push({
          id: maxID + 1,
          name: element.value,
          tasks: []
        });
      }
      else {
        columns.push({
          id: 1,
          name: element.value,
          tasks: []
        });
      };
    });
    
    const boardIDs = this.todoData.map((object:any) => {
      return object.id;
    })
    const maxID = Math.max(...boardIDs);
    this.board = {
      id: maxID + 1,
      name: form[0].value,
      columns: columns
    }
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
