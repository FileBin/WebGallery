import { ApplicationConfig, PLATFORM_ID, StaticProvider } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { isPlatformBrowser } from '@angular/common';

import { environment as env } from '../environments/environment';
import { provideHttpClient } from '@angular/common/http';

export function getBaseUrl() {
  if (isPlatformBrowser(PLATFORM_ID)) {
    return document.getElementsByTagName('base')[0].href;
  }

  return '/';
}

export function getUserApiUrl() {
  var host = getBaseUrl();

  if (env.isDevelopment) {
    host = 'http://localhost:5294/';
  }

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
    ...staticProviders,
    provideHttpClient(),
  ]
};
