import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormComponent } from '../../widgets/form/form.component';
import { LoginFieldComponent } from '../../widgets/fields/login-field/login-field.component';
import { PasswordFieldComponent } from '../../widgets/fields/password-field/password-field.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginDto, UserApiProxyService } from '../../services/user-api-proxy.service';
import { Router } from '@angular/router';
import { LOGIN_VALIDATORS } from '../../shared/validation-utils';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormComponent, LoginFieldComponent, PasswordFieldComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  @ViewChild(LoginFieldComponent, { static: true }) public login: LoginFieldComponent | undefined;
  @ViewChild(PasswordFieldComponent, { static: true }) public password: PasswordFieldComponent | undefined;

  form = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private formBuilder: FormBuilder,
    private userApi: UserApiProxyService,
    private router: Router) {}

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      login: [this.login?.value ?? '', LOGIN_VALIDATORS],
      password: [this.password?.value ?? '', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  send = () => {
    let dto: LoginDto = {
      login: this.f.login.value!,
      password: this.f.password.value!,
    };

    return this.userApi.login(dto);
  }

  onSuccess() {
    this.router.navigate(['/']);
  }
}
