import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-task-dialog',
  template: `
  <div class="dialog">
    <h3>Delete this task?</h3>
    <p>Are you sure you want to delete the '{{ data.title }}' task and its subtasks? This action cannot be reversed.</p>
    <mat-dialog-actions>
      <button mat-dialog-close="delete">Delete</button>
      <button mat-dialog-close>Cancel</button>
    </mat-dialog-actions>
  </div>
  `,
  styles: [`
  h3 {
    color: var(--warnBttn-background-color);
    font-size: 18px;
  }
  p {
    font-size: 13px;
    line-height: 23px;
    margin: 0 0 24px 0;
    color: var(--subText-color);
  }
  mat-dialog-actions {
    display: grid;
    gap: 16px;
    padding: 0;
    justify-content: inherit;
    border-top: none;
  }
  mat-dialog-actions > button:first-child {
    color: var(--warnBttn-color);
    background-color: var(--warnBttn-background-color);
  }
  mat-dialog-actions > button:last-child {
    color: var(--subBttn-color);
    background-color: var(--subBttn-background-color);
  }
  mat-dialog-actions > button {
    border-radius: 20px;
    padding: 8px;
    font-size: 13px;
    font-weight: 500;
  }
  `]
})
export class DeleteTaskDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  
}
