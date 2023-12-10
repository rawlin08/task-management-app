import { Component } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-theme-toggle',
  template: `
  <img src="assets/images/icon-light-theme.svg" alt="">
  <mat-slide-toggle class="themeToggle" [checked]="app.darkMode" (change)="app.toggleTheme()"></mat-slide-toggle>
  <img src="assets/images/icon-dark-theme.svg" alt="">
  `,
  styles: [``]
})
export class ThemeToggleComponent {
  constructor(public app: AppComponent) {}
}
