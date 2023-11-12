import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { SidebarComponent } from './components/sidebar.component';
import { HeadingComponent } from './components/heading.component';
import { ThemeToggleComponent } from './components/theme-toggle.component';
import { BoardComponent } from './components/board.component';

// Angular Material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { EmptyBoardComponent } from './components/empty-board.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NewTaskComponent } from './components/new-task.component';
import { EditTaskComponent } from './components/edit-task.component';
import { ViewTaskComponent } from './components/view-task.component';
import { NewBoardComponent } from './components/new-board.component';
import { EditBoardComponent } from './components/edit-board.component';
import { DeleteTaskComponent } from './components/delete-task.component';
import { DeleteBoardComponent } from './components/delete-board.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeadingComponent,
    ThemeToggleComponent,
    BoardComponent,
    EmptyBoardComponent,
    NewTaskComponent,
    EditTaskComponent,
    ViewTaskComponent,
    NewBoardComponent,
    EditBoardComponent,
    DeleteTaskComponent,
    DeleteBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatMenuModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
