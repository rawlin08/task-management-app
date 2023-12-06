import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-task-dialog',
  template: `
  `,
  styles: [``]
})
export class NewTaskDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
