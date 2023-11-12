import { Component, OnInit } from '@angular/core';
import * as todoData from 'src/assets/data.json';

@Component({
  selector: 'app-root',
  template: `
  <app-sidebar></app-sidebar>
  <main>
    <app-heading></app-heading>
    <app-board></app-board>
  </main>
  `,
  styles: [`
  app-sidebar {
    display: none;
  }

  /* TABLET STYLES */
  @media (min-width: 768px) {
    app-sidebar {
      display: block;
    }
  }

  /* DESKTOP STYLES */
  @media (min-width: 1281px) {

  }
  `]
})
export class AppComponent implements OnInit {
  title = 'task-management-app';
  constructor() {}
  ngOnInit(): void {
    this.data = todoData;
    this.data = this.data.boards;
    this.currentBoard = this.data.find((board:any) => board.id == 1);
    console.log(this.data);
    console.log(this.currentBoard);
    
  }

  data:any;
  currentBoard:any;
  boardEmpty:boolean = false;
}
