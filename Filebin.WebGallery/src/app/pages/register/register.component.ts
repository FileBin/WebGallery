import { Component, ViewChild } from '@angular/core';
import { PasswordFieldComponent } from '../../widgets/fields/password-field/password-field.component';
import { LoginFieldComponent } from '../../widgets/fields/login-field/login-field.component';
import { FormComponent } from '../../widgets/form/form.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RegisterDto, UserApiProxyService } from '../../services/user-api-proxy.service';
import { Router } from '@angular/router';
import { EMAIL_VALIDATORS, PASSWORD_VALIDATORS, USERNAME_VALIDATORS } from '../../shared/validation-utils';
import { UsernameFieldComponent } from '../../widgets/fields/username-field/username-field.component';
import { EmailFieldComponent } from '../../widgets/fields/email-field/email-field.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormComponent, EmailFieldComponent, UsernameFieldComponent, PasswordFieldComponent],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  @ViewChild(FormComponent, { static: true }) private formComponent: FormComponent | undefined;
  @ViewChild('email', { static: true }) public email: EmailFieldComponent | undefined;
  @ViewChild('username', { static: true }) public username: UsernameFieldComponent | undefined;
  @ViewChild('password', { static: true }) public password: PasswordFieldComponent | undefined;
  @ViewChild('retype_password', { static: true }) public retype_password: PasswordFieldComponent | undefined;

  isRegistered = false;

  form = new FormGroup({
    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    retype_password: new FormControl(''),
  });

  constructor(private formBuilder: FormBuilder,
    private userApi: UserApiProxyService,
    private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [this.email?.value ?? '', EMAIL_VALIDATORS],
      username: ['', USERNAME_VALIDATORS],
      password: ['', PASSWORD_VALIDATORS],
      retype_password: ['', PASSWORD_VALIDATORS],
    });
  }

  get f() {
    return this.form.controls;
  }

  validate = () => {
    var identical = this.f.retype_password.value == this.f.password.value;
    if (!identical) {
      this.setMessage('Passwords aren\'t equal');
    }
    return identical;
  }

  send = () => {
    let dto: RegisterDto = {
      email: this.f.email.value!,
      username: this.f.username.value!,
      password: this.f.password.value!,
    };

    return this.userApi.register(dto);
  }

  onSuccess() {
    this.isRegistered = true;
    if (this.formComponent)
    this.setMessage('Registration successful!');
    setTimeout(() => this.router.navigate(['/login']), 5000);
  }

  setMessage(message: string) {
    if (this.formComponent)
      this.formComponent.message = message;
  }
}
