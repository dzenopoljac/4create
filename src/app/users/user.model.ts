import { ID, guid } from '@datorama/akita';

export interface User {
  id: ID;
  name: string;
  active: boolean;
}

/**
 * A factory function that creates Users
 */
export function createUser(name: string, active: boolean) {
  return {
    id: guid(),
    name,
    active,
  } as User;
}
