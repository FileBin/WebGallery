import { Component, ElementRef, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BasicStateMatcher } from '../../../shared/basic-state-matcher';
import { MatInputModule } from '@angular/material/input';
import { EMAIL_VALIDATORS } from '../../../shared/validation-utils';
import { BaseField } from '../../../shared/base-field';

@Component({
  selector: 'app-email-field',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './email-field.component.html',
})
export class EmailFieldComponent extends BaseField {
  public static createFormControl() {
    return new FormControl('', EMAIL_VALIDATORS);
  }

  constructor(self: ElementRef<HTMLElement>) { super(self); }

  matcher = new BasicStateMatcher();

  @Input() formControl = EmailFieldComponent.createFormControl();
  @Input() label = 'Email';
  @Input() placeholder = 'email@example.com';
}
