import { ApplicationConfig, PLATFORM_ID, StaticProvider } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { isPlatformBrowser } from '@angular/common';

import { environment as env } from '../environments/environment';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { JwtInterceptor } from './middleware/jwt.interceptor';

export function getBaseUrl() {
  if (isPlatformBrowser(PLATFORM_ID)) {
    return document.getElementsByTagName('base')[0].href;
  }

  return '/';
}

export function getUserApiUrl() {
  var host = getBaseUrl();

  return `${host}api/accounts`;
}

const staticProviders: StaticProvider[] = [
  { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] },
  { provide: 'USER_API_URL', useFactory: getUserApiUrl },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    ...staticProviders,
  ]
};
