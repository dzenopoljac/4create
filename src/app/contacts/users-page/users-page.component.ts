import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ID } from '@datorama/akita';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserDialogComponent } from 'src/app/users/create-user-dialog/create-user-dialog.component';
import { UsersQuery } from 'src/app/users/state/users.query';
import { User } from 'src/app/users/user.model';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
})
export class UsersPageComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'active', 'delete'];
  users$: Observable<User[]>;
  test: boolean;

  constructor(
    private usersQuery: UsersQuery,
    private usersService: UsersService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.users$ = this.usersQuery.selectAll();
  }

  openDialog(): void {
    this.dialog.open(CreateUserDialogComponent, {
      width: '650px',
    });
  }

  toggleActive(user: User) {
    this.usersService.updateUser(user.id, !user.active);
  }

  isActive(id: ID) {
    return this.usersQuery.hasActive(id);
  }

  delete(id: ID) {
    this.usersService.deleteUser(id);
  }

  checkIsAvailable() {
    this.test = !this.usersService.checkIsAvailable();
    return this.test;
  }
}
