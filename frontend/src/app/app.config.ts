import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TokenInterceptor } from './services/auth/tokenInterceptor.service';
import { ErrorInterceptor } from './services/auth/errorInterceptor';
import { CommonModule } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    importProvidersFrom([BrowserAnimationsModule,BrowserModule,HttpClientModule],),

    provideHttpClient(
      withInterceptorsFromDi(),
    ),
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ]
};



