import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-column-dialog',
  template: `
  <div class="dialog">
    <h3>Add New Column</h3>
    <mat-dialog-content>
      <form #form action="">
        <div class="input">
          <label for="newColumn">Column Name</label>
          <input placeholder="e.g. Todo" type="text" id="newColumn" name="newColumn">
        </div>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions class="newColumnBttns">
      <button mat-dialog-close="create" (click)="createColumn($event, form)">Create New Column</button>
    </mat-dialog-actions>
  </div>
  `,
  styles: [`
  .newColumnBttns {
    display: flex;
    padding: 0 !important;
  }
  .newColumnBttns > button {
    font-size: 13px;
    font-weight: 500;
    border-radius: 20px;
    padding: 10px;
    width: 100%;
    background-color: var(--purple);
    color: var(--white);
  }
  `]
})
export class NewColumnDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  ngOnInit(): void {
    this.todoData = JSON.parse(localStorage.getItem('boards')!);
  }
  
  todoData:any;

  createColumn(e: Event, form:any) {
    e.preventDefault();
    const boardIDs = this.data.columns.map((object:any) => {
      return object.id;
    })
    let maxID:any;
    if (boardIDs.length == 0) {
      maxID = 0
    }
    else {
      maxID = Math.max(...boardIDs);
    }
    
    let newColumn = {
      id: maxID + 1,
      name: form.elements.newColumn.value,
      tasks: [],
      placeholder: 'e.g. Todo'
    }

    this.data.columns.push(newColumn);
    let board = this.todoData.find((board:any) => board.id == this.data.id);
    board.columns.push(newColumn);

    this.updateLocalStorage();
  }
  updateLocalStorage() {
    localStorage.setItem('boards', JSON.stringify(this.todoData));
  }
}
