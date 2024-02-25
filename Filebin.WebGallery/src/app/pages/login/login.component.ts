import { Component } from '@angular/core';
import { FormComponent } from '../../widgets/form/form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
}
