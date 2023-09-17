import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ID } from '@datorama/akita';
import { UsersService } from '../users.service';
import { UsersQuery } from '../state/users.query';
import { User } from '../user.model';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserDialogComponent } from 'src/app/users/create-user-dialog/create-user-dialog.component';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
})
export class UsersPageComponent implements OnInit {
  newUserDisabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  buttonEnabled$: Observable<boolean>;
  displayedColumns: string[] = ['id', 'name', 'active', 'delete'];
  users$: Observable<User[]>;
  test: boolean;

  constructor(
    private usersQuery: UsersQuery,
    private usersService: UsersService,
    public dialog: MatDialog
  ) {
    this.buttonEnabled$ = this.newUserDisabled$.asObservable();
  }

  ngOnInit() {
    this.users$ = this.usersQuery.selectAll();

    this.usersQuery.selectAll().subscribe((val) => {
      this.usersService.usersList$.next(val);
      this.newUserDisabled$.next(this.checkButtonEnabled(val));
    });
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

  checkButtonEnabled(list: User[]): boolean {
    const hasInactive = list.some((el) => !el.active);
    const hasMaximum = list.length >= 5;
    return hasInactive || hasMaximum;
  }
}
