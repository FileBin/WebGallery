import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { platform } from 'os';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthStateProviderService {

  public authorized$ = new BehaviorSubject(false);

  constructor(router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    router.events.subscribe((e) => {
      var nextState = this.isAuthorized();
      if (nextState != this.authorized$.value)
        this.authorized$.next(nextState);
    });
  }

  get access_token() {
    return localStorage?.getItem('access_token');
  }

  set access_token(token: string | null) {
    if (token === null) {
      this.removeTokens();
      return;
    }

    this.authorized$.next(true);

    localStorage.setItem('access_token', token);
  }

  get refresh_token() {
    return localStorage.getItem('refresh_token');
  }

  set refresh_token(token: string | null) {
    if (token === null) {
      this.removeTokens();
      return;
    }

    this.authorized$.next(true);

    localStorage.setItem('refresh_token', token);
  }

  removeTokens() {
    this.authorized$.next(false);

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  isAuthorized(): boolean {
    if (isPlatformServer(this.platformId)) return false;
    if (this.refresh_token !== null) {
      return true;
    }
    return false;
  }
}
