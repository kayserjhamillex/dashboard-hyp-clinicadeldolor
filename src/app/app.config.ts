import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { provideClientHydration, BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection(
      {
        eventCoalescing: true
      }
    ),
    provideRouter(
      routes,
      withViewTransitions(
        {
          skipInitialTransition: true,
          // onViewTransitionCreated()
        }
      )
    ),
    provideClientHydration(),
    importProvidersFrom(
      HttpClientModule,
      BrowserModule,
      BrowserAnimationsModule, // required animations module
      ToastrModule.forRoot(
        {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          preventDuplicates: true,
          autoDismiss: true
        }
      ), // ToastrModule added
    )
  ]
};
