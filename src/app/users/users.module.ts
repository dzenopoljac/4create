import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersPageComponent } from './users-page/users-page.component';
import { CreateUserDialogComponent } from './create-user-dialog/create-user-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [UsersPageComponent, CreateUserDialogComponent],
  exports: [UsersPageComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatMenuModule,
    MatIconModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatTableModule,
    MatSnackBarModule,
    MatRadioModule,
    MatInputModule,
    MatDialogModule,
  ],
})
export class UsersModule {}
