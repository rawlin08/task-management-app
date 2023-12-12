import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-new-board-dialog',
  encapsulation: ViewEncapsulation.None,
  providers: [],
  template: `
  <div class="dialog">
    <h3>Add New Board</h3>
    <mat-dialog-content>
      <form #form action="">
        <div class="name input">
          <label for="name">Board Name</label>
          <input required [ngClass]="titleFormControl.hasError('required') && titleFormControl.touched == true ? 'error' : ''" required matInput [errorStateMatcher]="matcher" [formControl]="titleFormControl" #boardName placeholder="e.g. Web Design" id="name" name="name" type="text">
          <mat-hint>*required</mat-hint>
          <mat-error *ngIf="titleFormControl.hasError('required') && titleFormControl.touched == true">Can't be empty</mat-error>
        </div>
        <div #columnNames class="columns input">
          <label>Board Columns</label>
          <div *ngFor="let column of newBoard.columns">
            <input required [ngClass]="columnNameFormControl.hasError('required') && columnNameFormControl.touched == true && column.id == 1 ? 'error' : ''" required matInput [errorStateMatcher]="matcher" [formControl]="column.id == 1 ? columnNameFormControl : place" [(ngModel)]="column.name" id="columnName" placeholder="e.g. Todo" [name]="column.id" type="text">
            <button type="button" (click)="deleteColumn(column.id)"><svg class="icon"><use href="#icon-delete"></use></svg></button>
            <mat-hint *ngIf="column.id == 1">*required</mat-hint>
            <mat-error *ngIf="columnNameFormControl.hasError('required') && columnNameFormControl.touched == true && column.id == 1">Can't be empty</mat-error>
          </div>
        </div>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions class="newBoard">
      <button type="button" (click)="addColumn()">+ Add New Column</button>
      <button [disabled]="titleFormControl.hasError('required') || columnNameFormControl.hasError('required')" mat-dialog-close="create" (click)="createBoard($event, form)">Create New Board</button>
    </mat-dialog-actions>
  </div>
  `,
  styles: [`
  .columns > div:nth-child(2) > button {
    display: none;
  }
  .columns > div:nth-child(2) {
    display: grid;
    justify-content: normal;
    gap: 3px;
  }
  .columns > div:not(:nth-child(2)) > input {
    width: 100%;
  }
  .columns > div {
    display: flex;
    justify-content: space-between;
    gap: 10px;
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
    opacity: 1;
    transition: opacity 0.1s ease-in-out;
  }
  .newBoard > button:last-child:disabled {
    opacity: 0.3;
    transition: opacity 0.2s ease-in-out;
  }
  `]
})
export class NewBoardDialogComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {
    this.todoData = JSON.parse(localStorage.getItem('boards')!);
  }
  titleFormControl = new FormControl('', [Validators.required]);
  columnNameFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  place:any;
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
  
    if (!this.titleFormControl.hasError('required') && !this.columnNameFormControl.hasError('required')) {
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
