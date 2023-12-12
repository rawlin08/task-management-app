import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-board-dialog',
  template: `
  <div class="dialog">
    <h3>Edit Board</h3>
    <mat-dialog-content>
      <form #form action="">
        <div class="name input">
          <label for="name">Board Name</label>
          <input required [ngClass]="titleFormControl.hasError('required') && titleFormControl.touched == true ? 'error' : ''" required matInput [errorStateMatcher]="matcher" [formControl]="titleFormControl" #boardName placeholder="e.g. Web Design" id="name" name="name" type="text" [value]="currentBoard.name">
          <mat-hint>*required</mat-hint>
          <mat-error *ngIf="titleFormControl.hasError('required') && titleFormControl.touched == true">Can't be empty</mat-error>
        </div>
        <div #columnNames class="columns input">
          <label>Board Columns</label>
          <mat-hint class="one">*at least one (1) required</mat-hint>
          <div *ngFor="let column of currentBoard.columns">
            <input [(ngModel)]="column.name" id="editcolumn" [placeholder]="column.placeholder" [name]="column.id" type="text">
            <button type="button" (click)="deleteColumn(column.id)"><svg class="icon"><use href="#icon-delete"></use></svg></button>
          </div>
        </div>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions class="editBoard">
      <button type="button" (click)="addColumn()">+ Add New Column</button>
      <button [disabled]="getVal()" mat-dialog-close="save" (click)="editBoard($event, form)">Save Changes</button>
    </mat-dialog-actions>
  </div>
  `,
  styles: [`
  .one {
    margin: -5px 0 0 0;
  }
  .columns > div {
    display: flex;
    justify-content: space-between;
    gap: 10px;
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
    padding: 10px;
    width: 100%;
    opacity: 1;
    transition: opacity 0.1s ease-in-out;
  }
  .editBoard > button:first-child {
    background-color: var(--white);
    color: var(--purple);
  }
  .editBoard > button:last-child {
    background-color: var(--purple);
    color: var(--white);
  }
  .editBoard > button:last-child:disabled {
    opacity: 0.3;
    transition: opacity 0.2s ease-in-out;
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
    console.log(this.currentBoard.columns.length == 1);
    
  }
  currentBoard:any = JSON.parse(JSON.stringify(this.data));
  titleFormControl = new FormControl(this.currentBoard.name, [Validators.required]);
  columnNameFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  place:boolean = false;
  todoData:any;
  board:any = {};

  getVal() {
    if (this.titleFormControl.hasError('required')) {
      return true;
    }
    if (this.currentBoard.columns.length == 1) {
      if (this.currentBoard.columns[0].name == '') {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      return false;
    }
  }
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
