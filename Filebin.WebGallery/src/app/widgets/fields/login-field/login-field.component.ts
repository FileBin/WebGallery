import { Component, ElementRef, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BasicStateMatcher } from '../../../shared/basic-state-matcher';
import { MatInputModule } from '@angular/material/input';
import { LOGIN_VALIDATORS } from '../../../shared/validation-utils';
import { BaseField } from '../../../shared/base-field';

@Component({
  selector: 'app-login-field',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './login-field.component.html',
})
export class LoginFieldComponent extends BaseField {
  public static createFormControl() {
    return new FormControl<string| null>(null, LOGIN_VALIDATORS);
  }

  constructor(self: ElementRef<HTMLElement>) { super(self); }

  matcher = new BasicStateMatcher();

  @Input() formControl = LoginFieldComponent.createFormControl();
  @Input() label = 'Login';
  @Input() placeholder = 'email or username';
}
