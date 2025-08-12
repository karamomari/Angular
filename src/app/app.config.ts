import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { athInterceptor } from './interceptors/auth.interceptor';
import { LoadingInterceptor } from './interceptors/loading-interceptor.interceptor';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,withHashLocation()),
    provideHttpClient(withInterceptors([athInterceptor, LoadingInterceptor])),
    provideToastr(), provideStore(), provideEffects()]
};
