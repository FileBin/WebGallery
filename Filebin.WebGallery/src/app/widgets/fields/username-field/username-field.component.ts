import { Component, ElementRef, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BasicStateMatcher } from '../../../shared/basic-state-matcher';
import { MatInputModule } from '@angular/material/input';
import { USERNAME_VALIDATORS } from '../../../shared/validation-utils';
import { BaseField } from '../../../shared/base-field';

@Component({
  selector: 'app-username-field',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './username-field.component.html',
})
export class UsernameFieldComponent extends BaseField {
  public static createFormControl() {
    return new FormControl('', USERNAME_VALIDATORS);
  }

  constructor(self: ElementRef<HTMLElement>) { super(self); }

  matcher = new BasicStateMatcher();
  
  @Input() formControl = UsernameFieldComponent.createFormControl();
  @Input() label = 'Username';
  @Input() placeholder = '';
}
