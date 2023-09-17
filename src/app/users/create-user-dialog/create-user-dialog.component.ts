import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from './notification.service';
import { UsersService } from '../users.service';
import { NameValidator } from '../name.validator';

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.scss'],
})
export class CreateUserDialogComponent implements OnInit {
  userForm: FormGroup;
  userList: any;

  constructor(
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService: NotificationService,
    private userService: UsersService
  ) {
    this.userForm = this._fb.group({
      name: [
        null,
        [Validators.required],
        [NameValidator.createValidator(this.userService)],
      ],
      active: false,
    });
  }

  ngOnInit(): void {
    this.userForm.patchValue(this.data);
  }

  addUser() {
    this.userService.addUser(this.userForm.value);
    this.notificationService.openSnackBar('Employee added successfully');
    this.dialogRef.close(true);
  }

  onFormSubmit() {
    if (!this.userForm.valid) return;
    this.addUser();
  }
}
