import { Component, ElementRef, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BasicStateMatcher } from '../../../shared/basic-state-matcher';
import { MatInputModule } from '@angular/material/input';
import { PASSWORD_VALIDATORS } from '../../../shared/validation-utils';
import { BaseField } from '../../../shared/base-field';

@Component({
  selector: 'app-password-field',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './password-field.component.html',
})
export class PasswordFieldComponent extends BaseField {
  public static createFormControl() {
    return new FormControl<string| null>(null, PASSWORD_VALIDATORS);
  }

  constructor(self: ElementRef<HTMLElement>) { super(self); }

  matcher = new BasicStateMatcher();

  @Input() formControl = PasswordFieldComponent.createFormControl();
  @Input() label = 'Password';
  @Input() placeholder = 'password';
}
