import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-task-dialog',
  encapsulation: ViewEncapsulation.None,
  template: `
  <div class="dialog">
    <h3>Edit Task</h3>
    <mat-dialog-content>
      <form #form action="">
        <div class="name input">
          <label for="title">Title</label>
          <input #title placeholder="e.g. Take coffee break" id="title" name="title" type="text" [value]="currentTask.title">
        </div>
        <div class="description input">
          <label for="description">Description</label>
          <textarea placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little." #description type="text" name="description" id="description" [value]="currentTask.description"></textarea>
        </div>
        <div #subtasks class="subtasks input">
          <label>Subtasks</label>
          <div class="multiInput">
            <div *ngFor="let subtask of currentTask.subtasks">
              <input [(ngModel)]="subtask.title" [name]="subtask.id" [placeholder]="subtask.placeholder" id="subdescription" name="subdescription" type="text">
              <button (click)="deleteSubtask(subtask.id)"><img src="assets/images/icon-cross.svg" alt=""></button>
            </div>
          </div>
          <button class="addSubtaskBtn" type="button" (click)="addSubtask()">+ Add New Subtask</button>
        </div>
        <div class="status input">
          <label>Status</label>
          <mat-select [(value)]="selectedStatus">
            <mat-option *ngFor="let column of data[1].columns" [value]="column.name">{{ column.name }}</mat-option>
          </mat-select>
        </div>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-dialog-close="save" (click)="editTask($event, form)">Save Changes</button>
    </mat-dialog-actions>
  </div>
  `,
  styles: [`
  .noDelete {
    display: none;
  }
  mat-select {
    outline: 1px solid var(--gray) !important;
    color: var(--white) !important;
    width: auto !important;
    margin: 0 1px;
    border-radius: 4px;
  }
  .mat-mdc-select-trigger {
    padding: 8px 16px;
  }
  .mat-mdc-select-value {
    color: var(--white);
    font-weight: 400;
    line-height: 20px;
  }
  .mdc-list-item__primary-text {
    color: var(--white);
  }
  .mat-pseudo-checkbox-checked::after {
    border-left: 2px solid var(--purple) !important;
  }
  .mat-pseudo-checkbox::after {
    border-bottom: 2px solid var(--purple) !important;
  }
  .mat-mdc-select-arrow {
    color: var(--purple);
  }
  .mat-mdc-select-panel {
    background: var(--dark-gray);
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
    background-color: var(--white);
    color: var(--purple);
    border-radius: 20px;
    font-weight: 500;
    margin: 8px 0 0 0;
    font-size: 13px;
  }
  mat-dialog-actions {
    padding: 0 !important;
    display: flex !important;
  }
  mat-dialog-actions > button {
    background-color: var(--purple);
    color: var(--white);
    border-radius: 20px;
    padding: 10px;
    font-weight: 500;
    width: 100%;
    font-size: 13px;
    margin: 10px 0 0 0;
  }
  `]
})
export class EditTaskDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  ngOnInit(): void {
    this.todoData = JSON.parse(localStorage.getItem('boards')!);
    if (this.currentTask.subtasks.length == 0) {
      this.addSubtask();
    }
  }

  todoData:any;
  currentTask = JSON.parse(JSON.stringify(this.data[0]));
  task:any = {};
  selectedStatus:any = this.currentTask.status

  editTask(e: Event, form:any) {
    e.preventDefault();

    // SEE IF SUBTASKS ARE BLANK
    let subtasks:any[] = [];
    this.currentTask.subtasks.forEach((element:any) => {
      if (element.title != '') {
        subtasks.push(element);
      }
    })

    this.task = {
      id: this.currentTask.id,
      title: form.elements.title.value,
      description: form.elements.description.value,
      status: this.selectedStatus,
      subtasks: subtasks
    }
    
    if (this.selectedStatus == this.currentTask.status) {
      let board = this.todoData.find((board:any) => board.id == this.data[1].id);
      let column = board.columns.find((column:any) => column.name == this.data[0].status);
      let index = column.tasks.indexOf(column.tasks.find((task:any) => task.id == this.currentTask.id));
      column.tasks[index] = this.task;
    }
    else {
      let board = this.todoData.find((board:any) => board.id == this.data[1].id);
      let column = board.columns.find((column:any) => column.name == this.data[0].status);
      column.tasks = column.tasks.filter((task:any) => task.id != this.data[0].id);
      console.log(column);
      
      let newColumn = board.columns.find((column:any) => column.name == this.selectedStatus);
      newColumn.tasks.push(this.task);
    }

    this.updateLocalStorage();
  }
  updateLocalStorage() {
    localStorage.setItem('boards', JSON.stringify(this.todoData));
  }
  deleteSubtask(subtaskID:any) {
    if (this.currentTask.subtasks.length != 1) {
      this.currentTask.subtasks = this.currentTask.subtasks.filter((subtask:any) => subtask.id != subtaskID);
    }
    else {
      this.currentTask.subtasks[0].title = '';
    }
  }
  addSubtask() {
    let maxID:any;
    if (this.currentTask.subtasks.length == 0) {
      maxID = 0;
    }
    else {
      const columnIDs = this.currentTask.subtasks.map((object:any) => {
        return object.id;
      })
      maxID = Math.max(...columnIDs);
    }
    
    this.currentTask.subtasks.push({
      id: maxID + 1,
      title: '',
      isCompleted: false,
      placeholder: 'e.g. Repeat the process'
    })
  }
}
