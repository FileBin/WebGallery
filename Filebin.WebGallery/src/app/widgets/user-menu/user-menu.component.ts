import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthStateProviderService } from '../../services/auth-state-provider.service';
import { UserInfoDto } from '../../services/user-api-proxy.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss'
})
export class UserMenuComponent {
  @Input({required: true}) userInfo!: UserInfoDto;

  constructor(private authStateProvider: AuthStateProviderService) {}

  logout() {
    this.authStateProvider.removeTokens();
  }
}
