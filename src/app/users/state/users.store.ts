import { Injectable } from '@angular/core';
import {
  EntityState,
  EntityStore,
  MultiActiveState,
  StoreConfig,
} from '@datorama/akita';
import { User, createUser } from '../user.model';
import { faker } from '@faker-js/faker';

export interface UsersState extends EntityState<User>, MultiActiveState {}

const initialState = {
  active: [],
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'users' })
export class UsersStore extends EntityStore<UsersState, User> {
  constructor() {
    super(initialState);
    this.set(mockUsers());
  }
}

function mockUsers() {
  return Array.from({ length: 4 }, () =>
    createUser(faker.person.firstName(), faker.datatype.boolean())
  );
}
