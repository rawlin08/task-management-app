import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DeleteTaskDialogComponent } from './delete-task-dialog.component';
import { Router } from '@angular/router';
import { EditTaskDialogComponent } from './edit-task-dialog.component';

@Component({
  selector: 'app-view-task-dialog',
  template: `
  <div class="dialog">
    <div>
      <h3>{{ currentTask.title }}</h3>
      <button [matMenuTriggerFor]="options"><img src="assets/images/icon-vertical-ellipsis.svg" alt=""></button>
      <mat-menu class="optionStyles" #options="matMenu">
        <div class="optionsBtns">
          <button (click)="openEditTaskDialog()" class="editBoardBtn">Edit Task</button>
          <button (click)="openDeleteTaskDialog()" class="deleteBoardBtn">Delete Task</button>
        </div>
      </mat-menu>
    </div>
    <p>{{ currentTask.description }}</p>
    <div>
      <p>Subtasks (0 of {{ currentTask.subtasks.length }})</p>
      <div class="subtask">
        <p *ngFor="let subtask of currentTask.subtasks"><mat-checkbox>{{ subtask.title }}</mat-checkbox></p>
      </div>
    </div>
    <div>
      <p>Current Status</p>
    </div>
  </div>
  `,
  styles: [``]
})
export class ViewTaskDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, public router: Router) {}
  ngOnInit(): void {
    this.todoData = JSON.parse(localStorage.getItem('boards')!);
  }

  todoData:any;
  currentTask:any = this.data[0];
  currentBoard:any = this.data[1];

  openEditTaskDialog() {
    let editTaskDialogRef = this.dialog.open(EditTaskDialogComponent, {
      width: '100%',
      data: this.data
    });

    editTaskDialogRef.afterClosed().subscribe(result => {
      if (result == 'save') {
        this.todoData = JSON.parse(localStorage.getItem('boards')!);
        let board = this.todoData.find((board:any) => board.id == this.currentBoard.id);
        console.log(board);
        let column = board.columns.find((column:any) => column.name == this.currentTask.status);
        console.log(column);
        
        this.currentTask = column.tasks.find((task:any) => task.id == this.currentTask.id);
      }
    }); 
  };
  openDeleteTaskDialog() {
    let deleteTaskDialogRef = this.dialog.open(DeleteTaskDialogComponent, {
      width: '100%',
      data: this.data
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
