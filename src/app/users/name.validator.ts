import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsersService } from './users.service';

export class NameValidator {
  static createValidator(userService: UsersService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return userService
        .checkName(control.value)
        .pipe(
          map((result: boolean) =>
            result ? { nameAlreadyExists: true } : null
          )
        );
    };
  }
}
