import { Component } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-view-task',
  template: `
  <div class="heading">
    <h4>{{ app.currentTask.title }}</h4>
  </div>
  <p>{{ app.currentTask.description }}</p>
  <div class="subtasks">
    <p>Subtasks (2 of {{ app.currentTask.subtasks.length }})</p>
    <div class="subtask" *ngFor="let subtask of app.currentTask.subtasks">
      <p>{{ subtask.title }}</p>
    </div>
  </div>
  <div class="status">
    <p>Current Status</p>
    
  </div>
  `,
  styles: [`
  .heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  `]
})
export class ViewTaskComponent {
  constructor(public app: AppComponent) {}
}
