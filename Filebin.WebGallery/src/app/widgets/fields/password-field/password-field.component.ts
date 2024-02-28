import { Component, ElementRef, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BasicStateMatcher } from '../../../shared/basic-state-matcher';
import { MatInputModule } from '@angular/material/input';
import { PASSWORD_VALIDATORS } from '../../../shared/validation-utils';
import { BaseField } from '../../../shared/base-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-password-field',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './password-field.component.html',
})
export class PasswordFieldComponent extends BaseField {
  hide = true;

  public static createFormControl() {
    return new FormControl<string| null>(null, PASSWORD_VALIDATORS);
  }

  constructor(self: ElementRef<HTMLElement>) { super(self); }

  matcher = new BasicStateMatcher();

  @Input() formControl = PasswordFieldComponent.createFormControl();
  @Input() label = 'Password';
  @Input() placeholder = 'password';
  @Input() name = 'password';
  @Input() autocomplete = 'current-password';
}
