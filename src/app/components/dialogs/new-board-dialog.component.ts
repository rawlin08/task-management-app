import { Component, OnDestroy, OnInit } from '@angular/core';

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
            <input [(ngModel)]="column.name" id="columnName" placeholder="e.g. Todo" [name]="column.id" type="text">
            <button type="button" (click)="deleteColumn(column.id)"><img src="assets/images/icon-cross.svg" alt=""></button>
          </div>
        </div>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions class="newBoard">
      <button type="button" (click)="addColumn()">+ Add New Column</button>
      <button mat-dialog-close="create" (click)="createBoard($event, form)">Create New Board</button>
    </mat-dialog-actions>
  </div>
  `,
  styles: [`
  .columns > div:nth-child(2) > button {
    display: none;
  }
  .columns > div {
    display: flex;
    justify-content: space-between;
    gap: 16px;
  }
  mat-dialog-content {
    padding: 0 0 12px 0 !important;
  }
  .newBoard {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 0 !important;
  }
  .newBoard > button {
    font-size: 13px;
    font-weight: 500;
    border-radius: 20px;
    padding: 10px;
    width: 100%;
  }
  .newBoard > button:first-child {
    background-color: var(--white);
    color: var(--purple);
  }
  .newBoard > button:last-child {
    background-color: var(--purple);
    color: var(--white);
  }
  #columnName {
    width: 100%;
  }
  `]
})
export class NewBoardDialogComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {
    this.todoData = JSON.parse(localStorage.getItem('boards')!);
  }

  todoData:any;
  newBoard:any = {
    columns: [
      {
        id: 1,
        name: '',
        tasks: []
      }
    ]
  };

  createBoard(e:Event, form:any) {
    e.preventDefault();
  
    const boardIDs = this.todoData.map((object:any) => {
      return object.id;
    })
    let maxID:any;
    if (boardIDs.length == 0) {
      maxID = 0
    }
    else {
      maxID = Math.max(...boardIDs);
    }
    this.newBoard = {
      id: maxID + 1,
      name: form.elements.name.value,
      columns: this.newBoard.columns
    }
    this.todoData.push(this.newBoard);
    this.updateLocalStorage();
  }
  updateLocalStorage() {
    localStorage.setItem('boards', JSON.stringify(this.todoData));
  }
  deleteColumn(columnID:any) {
    if (this.newBoard.columns.length != 1) {
      this.newBoard.columns = this.newBoard.columns.filter((column:any) => column.id != columnID);
    }
    else {
      this.newBoard.columns[0].name = '';
    }
  }
  addColumn() {
    const columnIDs = this.newBoard.columns.map((object:any) => {
      return object.id;
    })
    const maxID = Math.max(...columnIDs);

    this.newBoard.columns.push({
      id: maxID + 1,
      name: '',
      tasks: []
    })
  }
}
