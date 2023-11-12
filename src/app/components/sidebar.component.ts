import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: `
  <mat-drawer-container class="example-container" [hasBackdrop]="false">
  <mat-drawer #drawer mode="side">I'm a drawer</mat-drawer>
  <mat-drawer-content>
    <button mat-raised-button (click)="drawer.toggle()">Toggle drawer</button>
  </mat-drawer-content>
</mat-drawer-container>

  `,
  styles: [``]
})
export class SidebarComponent {

}
