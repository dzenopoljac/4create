import { Injectable, OnInit } from '@angular/core';
import { ID } from '@datorama/akita';
import { Observable, Subject, of, BehaviorSubject } from 'rxjs';
import { User, createUser } from './user.model';
import { UsersQuery } from './state/users.query';
import { UsersStore } from './state/users.store';

@Injectable({ providedIn: 'root' })
export class UsersService implements OnInit {
  usersList$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  userData$: Subject<string> = new Subject();
  userList: any;
  constructor(private usersStore: UsersStore, private usersQuery: UsersQuery) {}

  ngOnInit() {
    this.usersQuery.selectAll().subscribe();
  }

  toggleActive(id: ID) {
    this.usersStore.toggleActive(id);
    this.usersStore.setActive;
  }

  deleteUser(id: ID) {
    this.usersStore.remove(id);
  }

  updateUser(id: ID, active: boolean) {
    this.usersStore.update(id, { active });
  }

  addUser(user: User) {
    user = createUser(user.name, user.active);
    this.usersStore.add(user);
  }

  checkName(user: string): Observable<any> {
    const list = this.usersList$.getValue();
    const nameExist = list.some(
      (el: any) => el.name.toLowerCase() === user.toLowerCase()
    );
    return of(nameExist);
  }
}
