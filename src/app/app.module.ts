import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

// Components
import { HeadingComponent } from './components/heading.component';
import { ThemeToggleComponent } from './components/theme-toggle.component';
import { BoardComponent } from './components/board.component';
import { EditTaskComponent } from './components/edit-task.component';
import { ViewTaskComponent } from './components/view-task.component';
import { NewBoardComponent } from './components/new-board.component';
import { EditBoardComponent } from './components/edit-board.component';
import { DeleteTaskComponent } from './components/delete-task.component';
import { DeleteBoardComponent } from './components/delete-board.component';
import { EmptyBoardComponent } from './components/empty-board.component';

// Angular Material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { NewBoardDialogComponent } from './components/dialogs/new-board-dialog.component';
import { DeleteBoardDialogComponent } from './components/dialogs/delete-board-dialog.component';
import { DeleteTaskDialogComponent } from './components/dialogs/delete-task-dialog.component';
import { NewTaskDialogComponent } from './components/dialogs/new-task-dialog.component';
import { ViewTaskDialogComponent } from './components/dialogs/view-task-dialog.component';
import { EditBoardDialogComponent } from './components/dialogs/edit-board-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HeadingComponent,
    ThemeToggleComponent,
    BoardComponent,
    EmptyBoardComponent,
    EditTaskComponent,
    ViewTaskComponent,
    NewBoardComponent,
    EditBoardComponent,
    DeleteTaskComponent,
    DeleteBoardComponent,
    NewBoardDialogComponent,
    DeleteBoardDialogComponent,
    DeleteTaskDialogComponent,
    NewTaskDialogComponent,
    ViewTaskDialogComponent,
    EditBoardDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatMenuModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSelectModule,
    FormsModule
  ],
  providers: [AppComponent, NewBoardDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
