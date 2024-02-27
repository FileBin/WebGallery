import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthStateProviderService } from '../../services/auth-state-provider.service';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss'
})
export class UserMenuComponent {
  constructor(private authStateProvider: AuthStateProviderService) {}
  logout() {
    this.authStateProvider.removeTokens();
  }
}
