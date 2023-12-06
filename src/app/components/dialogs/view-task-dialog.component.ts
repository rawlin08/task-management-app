import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DeleteTaskDialogComponent } from './delete-task-dialog.component';

@Component({
  selector: 'app-view-task-dialog',
  template: `
  <div class="dialog">
    <div>
      <h3>{{ data[0].title }}</h3>
      <button [matMenuTriggerFor]="options"><img src="assets/images/icon-vertical-ellipsis.svg" alt=""></button>
      <mat-menu class="optionStyles" #options="matMenu">
        <div class="optionsBtns">
          <button class="editBoardBtn">Edit Task</button>
          <button (click)="openDeleteTaskDialog()" class="deleteBoardBtn">Delete Task</button>
        </div>
      </mat-menu>
    </div>
    <p>{{ data[0].description }}</p>
    <div>
      <p>Subtasks (0 of {{ data[0].subtasks.length }})</p>
      <div class="subtask">
        <p *ngFor="let subtask of data[0].subtasks"><mat-checkbox>{{ subtask.title }}</mat-checkbox></p>
      </div>
    </div>
    <div>
      <p>Current Status</p>
    </div>
  </div>
  `,
  styles: [``]
})
export class ViewTaskDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) {}
  
  openDeleteTaskDialog() {
    let deleteTaskDialogRef = this.dialog.open(DeleteTaskDialogComponent, {
      width: '100%',
      data: this.data
    });

    deleteTaskDialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      console.log(this.data);
      
      if (result == 'delete') {
        let board = this.data.find((currBoard:any) => currBoard.id == this.data[1].id);
        console.log(board);
        
        board = board.filter((task:any) => task.id != this.data[0].id);
      }
    }); 
  };
}
