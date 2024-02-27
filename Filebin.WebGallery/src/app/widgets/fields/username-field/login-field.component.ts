import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BasicStateMatcher } from '../../../shared/basic-state-matcher';
import { MatInputModule } from '@angular/material/input';
import { LOGIN_VALIDATORS } from '../../../shared/validation-utils';

@Component({
  selector: 'app-login-field',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './login-field.component.html',
})
export class LoginFieldComponent {
  public static createFormControl() {
    return new FormControl('', LOGIN_VALIDATORS);
  }

  matcher = new BasicStateMatcher();
  
  @Input() formControl = LoginFieldComponent.createFormControl();
  @Input() label = 'Login';
}
