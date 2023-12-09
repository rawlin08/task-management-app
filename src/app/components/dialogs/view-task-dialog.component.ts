import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DeleteTaskDialogComponent } from './delete-task-dialog.component';
import { Router } from '@angular/router';
import { EditTaskDialogComponent } from './edit-task-dialog.component';

@Component({
  selector: 'app-view-task-dialog',
  encapsulation: ViewEncapsulation.None,
  template: `
  <div class="dialog">
    <div class="heading">
      <h3>{{ currentTask.title }}</h3>
      <button [matMenuTriggerFor]="options"><img src="assets/images/icon-vertical-ellipsis.svg" alt=""></button>
    </div>
    <!-- MENU FOR EDIT AND DELETE TASK -->
    <mat-menu class="optionStyles" #options="matMenu">
      <div class="optionsBtns">
        <button (click)="openEditTaskDialog()" class="editBoardBtn">Edit Task</button>
        <button (click)="openDeleteTaskDialog()" class="deleteBoardBtn">Delete Task</button>
      </div>
    </mat-menu>
    <p class="description">{{ currentTask.description }}</p>
    <p class="subtasksLabel">Subtasks ({{ getCompleted(currentTask) }} of {{ currentTask.subtasks.length }})</p>
    <div class="subtasks">
      <div class="subtaskContainer" *ngFor="let subtask of currentTask.subtasks">
        <mat-checkbox [ngClass]="subtask.isCompleted == true ? 'completed' : 'notCompleted'" [checked]="subtask.isCompleted" (change)="toggleTaskComplete(subtask)">{{ subtask.title }}</mat-checkbox>
      </div>
    </div>
    <div class="status input">
      <label>Current Status</label>
      <mat-select [(value)]="selectedStatus" (selectionChange)="changeTaskStatus()">
        <mat-option *ngFor="let column of data[1].columns" [value]="column.name">{{ column.name }}</mat-option>
      </mat-select>
    </div>
  `,
  styles: [`
  .editBoardBtn, .deleteBoardBtn {
    font-size: 13px;
    width: 160px;
    text-align: left;
  }
  .deleteBoardBtn {
    color: var(--red);
  }
  .optionsBtns {
    padding: 10px;
    display: grid;
    gap: 16px;
  }
  .heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  .heading h3 {
    margin: 0;
  }
  .description {
    color: var(--gray);
    margin: 24px 0;
  }
  .subtasksLabel {
    font-size: 12px;
    font-weight: 500;
    margin: 0 0 16px 0;
  }
  .subtasks {
    display: grid;
    gap: 8px;
  }
  .subtaskContainer {
    padding: 4px;
    background-color: var(--very-dark-gray);
    border-radius: 4px;
  }
  .status {
    margin: 24px 0 0 0;
  }
  .status label {
    font-size: 12px;
    font-weight: 500;
  }

  /* Subtask styles */
  .mat-mdc-checkbox label {
    color: var(--white);
  }
  .completed label {
    text-decoration: line-through;
    opacity: 0.5;
  }
  .notCompleted label {
    text-decoration: none;
    opacity: 1;
  }

  /* Checkbox styles */
  .mat-mdc-checkbox.mat-accent {
    --mdc-checkbox-selected-icon-color: var(--purple);
    --mdc-checkbox-selected-hover-icon-color: var(--purple);
    --mdc-checkbox-selected-pressed-icon-color: var(--purple);
    --mdc-checkbox-selected-focus-icon-color: none;
    --mdc-checkbox-unselected-icon-color: var(--white);
    --mdc-checkbox-unselected-pressed-icon-color: var(--white);
    --mdc-checkbox-unselected-hover-icon-color: var(--white);
    --mdc-checkbox-unselected-focus-icon-color: none;
  }
  .mdc-checkbox__background {
    border: none !important;
    padding: 2px !important;
  }
  .mat-mdc-checkbox .mdc-checkbox .mdc-checkbox__native-control:enabled:not(:checked):not(:indeterminate):not([data-indeterminate="true"]) ~ .mdc-checkbox__background {
    background-color: var(--white) !important;
  }
  .mat-mdc-checkbox.mat-accent .mdc-checkbox--selected ~ .mdc-checkbox__ripple {
    background: none;
  }
  `]
})
export class ViewTaskDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, public router: Router) {}
  ngOnInit(): void {
    this.todoData = JSON.parse(localStorage.getItem('boards')!);
  }

  todoData:any;
  currentTask:any = this.data[0];
  currentBoard:any = this.data[1];
  selectedStatus:any = this.data[0].status;

  getCompleted(task:any) {
    let completed = task.subtasks.filter((subtask:any) => subtask.isCompleted == true);
    return completed.length
  }
  toggleTaskComplete(subtask:any) {
    let board = this.todoData.find((board:any) => board.id == this.data[1].id);
    let column = board.columns.find((column:any) => column.name == this.data[0].status);
    let index = column.tasks.indexOf(column.tasks.find((task:any) => task.id == this.currentTask.id));
    
    let subtaskRef = this.currentTask.subtasks.find((task:any) => task.id == subtask.id);
    if (subtaskRef.isCompleted == true) {
      subtaskRef.isCompleted = false;
    }
    else {
      subtaskRef.isCompleted = true;
    }
    
    column.tasks[index] = this.currentTask;
    console.log(this.todoData);
    
    this.updateLocalStorage();
  }
  changeTaskStatus() {
    let board = this.todoData.find((board:any) => board.id == this.currentBoard.id);
    let column = board.columns.find((column:any) => column.name == this.currentTask.status);
    column.tasks = column.tasks.filter((task:any) => task.id != this.currentTask.id);
    
    let newColumn = board.columns.find((column:any) => column.name == this.selectedStatus);
    this.currentTask.status = this.selectedStatus;
    newColumn.tasks.push(this.currentTask);
    this.updateLocalStorage();
  }

  openEditTaskDialog() {
    let editTaskDialogRef = this.dialog.open(EditTaskDialogComponent, {
      width: '100%',
      data: [this.currentTask, this.currentBoard]
    });

    editTaskDialogRef.afterClosed().subscribe(result => {
      if (result == 'save') {
        this.todoData = JSON.parse(localStorage.getItem('boards')!);
        let board = this.todoData.find((board:any) => board.id == this.currentBoard.id);
        let task:any = []
        board.columns.forEach((element:any) => {
          element.tasks.forEach((element:any) => {
            if (element.id == this.currentTask.id) {
              task.push(element);
            }
          });
        });
        
        this.currentTask = task[0];
        this.selectedStatus = this.currentTask.status;
        console.log(this.currentTask);    
      }
    }); 
  };
  openDeleteTaskDialog() {
    let deleteTaskDialogRef = this.dialog.open(DeleteTaskDialogComponent, {
      width: '100%',
      data: this.currentTask
    });

    deleteTaskDialogRef.afterClosed().subscribe(result => {
      if (result == 'delete') {
        let board = this.todoData.find((board:any) => board.id == this.currentBoard.id);
        let column = board.columns.find((column:any) => column.name == this.currentTask.status);
        column.tasks = column.tasks.filter((task:any) => task.id != this.currentTask.id);
        console.log(this.todoData);
        
        this.updateLocalStorage();
        location.reload();
      }
    }); 
  };
  updateLocalStorage() {
    localStorage.setItem('boards', JSON.stringify(this.todoData));
  }
}
