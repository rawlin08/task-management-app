import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
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
  selector: 'app-new-column-dialog',
  encapsulation: ViewEncapsulation.None,
  template: `
  <div class="dialog">
    <h3>Add New Column</h3>
    <mat-dialog-content>
      <form #form action="">
        <div class="input">
          <label for="newColumn">Column Name</label>
          <input [ngClass]="columnNameFormControl.hasError('required') && columnNameFormControl.touched == true ? 'error' : ''" required matInput [errorStateMatcher]="matcher" [formControl]="columnNameFormControl" placeholder="e.g. Todo" type="text" id="newColumn" name="newColumn">
          <mat-hint class="columnHint">*required</mat-hint>
          <mat-error *ngIf="columnNameFormControl.hasError('required') && columnNameFormControl.touched == true">Can't be empty</mat-error>
        </div>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions class="newColumnBttns">
      <button [disabled]="columnNameFormControl.hasError('required')" mat-dialog-close="create" (click)="createColumn($event, form)">Create New Column</button>
    </mat-dialog-actions>
  </div>
  `,
  styles: [`
  .columnHint {
    margin: -5px 0 0 0;
  }
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
    opacity: 1;
    transition: opacity 0.1s ease-in-out;
  }
  .newColumnBttns > button:disabled {
    opacity: 0.3;
    transition: opacity 0.2s ease-in-out;
  }
  `]
})
export class NewColumnDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  ngOnInit(): void {
    this.todoData = JSON.parse(localStorage.getItem('boards')!);
  }
  columnNameFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  
  todoData:any;

  createColumn(e: Event, form:any) {
    e.preventDefault();
    console.log(this.columnNameFormControl);
    
    if (!this.columnNameFormControl.hasError('required')) {
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
  }
  updateLocalStorage() {
    localStorage.setItem('boards', JSON.stringify(this.todoData));
  }
}
