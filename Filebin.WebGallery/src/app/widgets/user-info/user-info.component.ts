import { AfterViewInit, Component, ViewChild, afterNextRender } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthStateProviderService } from '../../services/auth-state-provider.service';
import { UserApiProxyService, UserInfoDto } from '../../services/user-api-proxy.service';
import { RouterModule } from '@angular/router';
import { UserMenuComponent } from '../user-menu/user-menu.component';
import { LoginFieldComponent } from '../fields/login-field/login-field.component';
@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [MatIcon, MatButtonModule, MatProgressSpinnerModule, RouterModule, UserMenuComponent],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})

export class UserInfoComponent implements AfterViewInit {

  isLoading = false;
  isLoggedIn = false;

  isExpanded = false;

  userInfo: UserInfoDto | null = null;

  constructor(
    private authStateProvider: AuthStateProviderService,
    private userApi: UserApiProxyService) {
    afterNextRender(() => {
      this.update();
      authStateProvider.authorized$.subscribe((x) => {
        this.isLoggedIn = x;
        this.update();
      });
    });
  }

  ngAfterViewInit(): void {
    this.isExpanded = false;
  }

  update() {
    if (this.isLoggedIn) {
      if (this.userInfo === null) {
        this.isLoading = true;
        this.userApi.userInfo().subscribe({
          next: (info) => {
            this.userInfo = info;
            this.isLoading = false;
          }
        })
          .add(() => this.isLoading = false)
      }
    } else {
      this.isLoading = false;
    }
  }
}
