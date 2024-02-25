import { Component, afterNextRender } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthStateProviderService } from '../../services/auth-state-provider.service';
import { UserApiProxyService, UserInfoDto } from '../../services/user-api-proxy.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [MatIcon, MatButtonModule, MatProgressSpinnerModule, RouterModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})

export class UserInfoComponent {
  isLoading = false;

  userInfo : UserInfoDto | null = null;

  constructor(
    private authStateProvider: AuthStateProviderService,
    private userApi: UserApiProxyService) {
    afterNextRender(() => {
      if (this.isLoggedIn()) {
        this.isLoading = true;
        
        userApi.userInfo().subscribe({
          next: (info) => { this.userInfo = info; }
        })
        .add(() => this.isLoading = false)
      } else {
        this.isLoading = false;
      }
    });
  }

  isLoggedIn() { return this.authStateProvider.isAuthorized(); }
}
