import { Component, EventEmitter, Inject, Output, PLATFORM_ID } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SearchComponent } from '../search/search.component';
import { UserInfoComponent } from '../user-info/user-info.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, SearchComponent, UserInfoComponent, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  appName = 'WebGallery'

  @Output() toggleSidenav = new EventEmitter<void>();
}
