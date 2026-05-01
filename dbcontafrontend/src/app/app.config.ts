import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { 
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
 } from '@angular/common/http';

import { MatPaginatorModule } from '@angular/material/paginator';
 import { FormsModule } from '@angular/forms';
import { loaderInterceptor } from './Interceptores/loader/loader.interceptor';
import { authInterceptor } from './Interceptores/Auth/auth.interceptor';
 

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), [provideHttpClient(withInterceptors([loaderInterceptor,authInterceptor]))]]
};
