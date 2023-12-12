import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-board-dialog',
  template: `
  <div class="dialog">
    <h3>Edit Board</h3>
    <mat-dialog-content>
      <form #form action="">
        <div class="name input">
          <label for="name">Board Name</label>
          <input #boardName placeholder="e.g. Web Design" id="name" name="name" type="text" [value]="currentBoard.name">
        </div>
        <div #columnNames class="columns input">
          <label>Board Columns</label>
          <div *ngFor="let column of currentBoard.columns">
            <input [(ngModel)]="column.name" id="editcolumn" [placeholder]="column.placeholder" [name]="column.id" type="text">
            <button type="button" (click)="deleteColumn(column.id)"><img src="assets/images/icon-cross.svg" alt=""></button>
          </div>
        </div>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions class="editBoard">
      <button type="button" (click)="addColumn()">+ Add New Column</button>
      <button mat-dialog-close="save" (click)="editBoard($event, form)">Save Changes</button>
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
  .editBoard {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 0 !important;
  }
  .editBoard > button {
    font-size: 13px;
    font-weight: 500;
    border-radius: 20px;
    padding: 8px;
    width: 100%;
  }
  .editBoard > button:first-child {
    background-color: var(--white);
    color: var(--purple);
  }
  .editBoard > button:last-child {
    background-color: var(--purple);
    color: var(--white);
  }
  #editcolumn {
    width: 100%;
  }
  `]
})
export class EditBoardDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  ngOnInit(): void {
    this.todoData = JSON.parse(localStorage.getItem('boards')!);
  }

  todoData:any;
  currentBoard:any = JSON.parse(JSON.stringify(this.data));
  board:any = {};

  editBoard(e: Event, form:any) {
    e.preventDefault();
    this.board = {
      id: this.currentBoard.id,
      name: form.elements.name.value,
      columns: this.currentBoard.columns
    }
    
    let index = this.todoData.indexOf(this.todoData.find((board:any) => board.id == this.currentBoard.id));
    this.todoData[index] = this.board;
    
    this.updateLocalStorage();
  }
  updateLocalStorage() {
    localStorage.setItem('boards', JSON.stringify(this.todoData));
  }
  deleteColumn(columnID:any) {
    if (this.currentBoard.columns.length != 1) {
      this.currentBoard.columns = this.currentBoard.columns.filter((column:any) => column.id != columnID);
    }
    else {
      this.currentBoard.columns[0].name = '';
    }
  }
  addColumn() {
    const columnIDs = this.currentBoard.columns.map((object:any) => {
      return object.id;
    })
    console.log(columnIDs);
    const maxID = Math.max(...columnIDs);

    this.currentBoard.columns.push({
      id: maxID + 1,
      name: '',
      tasks: [],
      placeholder: 'e.g. Todo'
    })
    console.log(this.currentBoard);
    
  }
}
