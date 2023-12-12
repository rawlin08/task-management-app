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
  selector: 'app-new-task-dialog',
  encapsulation: ViewEncapsulation.None,
  template: `
  <div class="dialog">
    <h3>Add New Task</h3>
    <mat-dialog-content>
      <form #form action="">
        <div class="name input">
          <label for="title">Title</label>
          <input required [ngClass]="titleFormControl.hasError('required') && titleFormControl.touched == true ? 'error' : ''" matInput [errorStateMatcher]="matcher" [formControl]="titleFormControl" #title placeholder="e.g. Take coffee break" id="title" name="title" type="text">
          <mat-hint>*required</mat-hint>
          <mat-error *ngIf="titleFormControl.hasError('required') && titleFormControl.touched == true">Can't be empty</mat-error>
        </div>
        <div class="description input">
          <label for="description">Description</label>
          <textarea placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little." #description type="text" name="description" id="description"></textarea>
        </div>
        <div #subtasks class="subtasks input">
          <label>Subtasks</label>
          <div class="multiInput newSubtasks">
            <div *ngFor="let subtask of newTask.subtasks">
              <input [(ngModel)]="subtask.title" [name]="subtask.id" [placeholder]="subtask.placeholder" id="subdescription" name="subdescription" type="text">
              <button (click)="deleteSubtask(subtask.id)"><img src="assets/images/icon-cross.svg" alt=""></button>
            </div>
          </div>
          <button class="addSubtaskBtn" type="button" (click)="addSubtask()">+ Add New Subtask</button>
        </div>
        <div class="status input">
          <label>Status</label>
          <mat-select [(value)]="selectedStatus">
            <mat-option *ngFor="let column of data.columns" [value]="column.name">{{ column.name }}</mat-option>
          </mat-select>
        </div>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions class="new">
      <button [disabled]="titleFormControl.hasError('required')" mat-dialog-close="create" (click)="createNewTask($event, form)">Create New Task</button>
    </mat-dialog-actions>
  </div>
  `,
  styles: [`
    .newSubtasks > div:first-child > button {
      display: none;
    }
    .subtasks > div > div {
      display: flex;
      justify-content: space-between;
      gap: 16px;
    }
    #description {
      height: 112px;
    }
    #subdescription {
      width: 100%;
    }
    .addSubtaskBtn {
      padding: 10px;
      background-color: var(--subBttn-background-color);
      color: var(--purple);
      border-radius: 20px;
      font-weight: 500;
      margin: 8px 3px 0 3px;
      font-size: 13px;
    }
    .new {
      padding: 0 !important;
      display: flex !important;
    }
    .new > button {
      background-color: var(--purple);
      color: var(--white);
      border-radius: 20px;
      padding: 10px;
      font-weight: 500;
      width: 100%;
      font-size: 13px;
      margin: 10px 0 0 0;
      opacity: 1;
      transition: all 0.1s ease-in-out;
    }
    #subdescription ~ button {
      margin: 0 3px 0 0;
    }
    .new > button:disabled {
    opacity: 0.3;
    transition: opacity 0.2s ease-in-out;
  }

    @media (hover: hover) {
      #subdescription ~ button:hover {
        color: var(--red);
      }
      .new > button:hover {
        background-color: var(--light-purple);
        transition: all 0.1s ease-in-out;
      }
    }
  `]
})
export class NewTaskDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  ngOnInit(): void {
    this.todoData = JSON.parse(localStorage.getItem('boards')!);
  }
  titleFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  todoData:any;
  selectedStatus:any = this.data.columns[0].name;
  newTask:any = {
    subtasks: [
      {
        id: 1,
        title: '',
        isCompleted: false,
        placeholder: 'e.g. Make coffee'
      },
      {
        id: 2,
        title: '',
        isCompleted: false,
        placeholder: 'e.g. Drink coffee & smile'
      }
    ]
  };

  createNewTask(e:Event, form:any) {
    e.preventDefault();

    // SEE IF SUBTASKS ARE BLANK
    let subtasks:any[] = [];
    this.newTask.subtasks.forEach((element:any) => {
      if (element.title != '') {
        subtasks.push(element);
      }
    })

    // GET TASK IDS
    let taskIDs:any[] = [];
    this.data.columns.forEach((column:any) => {
      column.tasks.forEach((task:any) => {
        taskIDs.push(task.id);
      });
    });
    let maxID:any;
    if (taskIDs.length == 0) {
      maxID = 0
    }
    else {
      maxID = Math.max(...taskIDs);
    }
    this.newTask = {
      id: maxID + 1,
      title: form.elements.title.value,
      description: form.elements.description.value,
      status: this.selectedStatus,
      subtasks: subtasks
    }
    let board = this.todoData.find((board:any) => board.id == this.data.id);
    let column = board.columns.find((column:any) => column.name == this.selectedStatus);
    column.tasks.push(this.newTask);
    this.updateLocalStorage();
  }
  updateLocalStorage() {
    localStorage.setItem('boards', JSON.stringify(this.todoData));
  }
  deleteSubtask(subtaskID:any) {
    if (this.newTask.subtasks.length != 1) {
      this.newTask.subtasks = this.newTask.subtasks.filter((subtask:any) => subtask.id != subtaskID);
    }
  }
  addSubtask() {
    const columnIDs = this.newTask.subtasks.map((object:any) => {
      return object.id;
    })
    console.log(columnIDs);
    const maxID = Math.max(...columnIDs);

    this.newTask.subtasks.push({
      id: maxID + 1,
      title: '',
      isCompleted: false,
      placeholder: 'e.g. Repeat the process'
    })
  }
}
