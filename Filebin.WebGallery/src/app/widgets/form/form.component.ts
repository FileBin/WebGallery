import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ApiRequestForm } from '../../shared/api-request-form';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, ReactiveFormsModule, MatProgressSpinnerModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})

export class FormComponent extends ApiRequestForm {
  @Input({ required: true }) formGroup!: AbstractControl;
  @Input({ required: true }) sendRequestProcessor!: () => Observable<void>;
  @Output() complete = new EventEmitter<void>();

  public override get form(): AbstractControl {
    return this.formGroup;
  }

  public override sendRequest(): Observable<void> {
    return this.sendRequestProcessor();
  }

  public override onComplete(): void {
    this.complete.emit();
  }

  public override onSubmit(): void {
      super.onSubmit();
  }

  @Input() title = 'Form'
}
