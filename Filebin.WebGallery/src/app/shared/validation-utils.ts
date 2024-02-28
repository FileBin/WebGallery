import { ValidatorFn, Validators } from "@angular/forms";

export const EMAIL_VALIDATORS: ValidatorFn[] = [Validators.required, Validators.email];

export const LOGIN_VALIDATORS: ValidatorFn[] = [Validators.required];

export const USERNAME_VALIDATORS: ValidatorFn[] = [Validators.required, Validators.minLength(3)];

export const PASSWORD_VALIDATORS: ValidatorFn[] = [Validators.required, Validators.minLength(8)];
