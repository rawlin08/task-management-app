import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
          <input #title placeholder="e.g. Take coffee break" id="title" name="title" type="text">
        </div>
        <div class="description input">
          <label for="description">Description</label>
          <textarea placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little." #description type="text" name="description" id="description"></textarea>
        </div>
        <div #subtasks class="subtasks input">
          <label>Subtasks</label>
          <div class="multiInput">
            <div *ngFor="let subtask of newTask.subtasks">
              <input [placeholder]="subtask.placeholder" id="subdescription" name="subdescription" type="text">
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
    <mat-dialog-actions>
      <button mat-dialog-close="create" (click)="createNewTask($event, form)">Create New Task</button>
    </mat-dialog-actions>
  </div>
  `,
  styles: [`
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
export class NewTaskDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  ngOnInit(): void {
    this.todoData = JSON.parse(localStorage.getItem('boards')!);
  }

  todoData:any;
  selectedStatus:any = this.data.columns[0].name;
  newTask:any = {
    subtasks: [
      {
        id: 1,
        content: '',
        placeholder: 'e.g. Make coffee'
      },
      {
        id: 2,
        content: '',
        placeholder: 'e.g. Drink coffee & smile'
      }
    ]
  };
  task:any = {};

  createNewTask(e:Event, formElements:any) {
    e.preventDefault();
    let form:any[] = Object.values(formElements.elements);
    let subtaskElements = form.filter((element:any) => element.id == 'subdescription');
    
    // GET SUBTASKS
    let subtasks:any[] = [];
    subtaskElements.forEach((element:any) => {
      if (subtasks.length != 0) {
        const subtaskIDs = subtasks.map((object:any) => {
          return object.id;
        });
        const maxID = Math.max(...subtaskIDs);
        subtasks.push({
          id: maxID + 1,
          title: element.value,
          isCompleted: false
        });
      }
      else {
        subtasks.push({
          id: 1,
          title: element.value,
          isCompleted: false
        });
      };
    })

    // GET TASK IDS
    let taskIDs:any[] = [];
    this.data.columns.forEach((column:any) => {
      column.tasks.forEach((task:any) => {
        taskIDs.push(task.id);
      });
    });
    
    const maxID = Math.max(...taskIDs);
    this.task.id = maxID + 1;

    // GET NEW TASK READY
    this.task = {
      id: maxID + 1,
      title: form[0].value,
      description: form[1].value,
      status: this.selectedStatus,
      subtasks: subtasks
    }
    console.log(this.task);
    let board = this.todoData.find((board:any) => board.id == this.data.id);
    let column = board.columns.find((column:any) => column.name == this.selectedStatus);
    column.tasks.push(this.task);
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
      content: ''
    })
  }
}
