import { provideAnimations } from "@angular/platform-browser/animations";
import { TuiRootModule } from "@taiga-ui/core";
import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { APP_ROUTES } from './app.routes';
import { ThemeSwitcherService } from "@core/services/theme-switcher.service";
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from "ng-recaptcha";
import { environment } from "@environments/environment";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(), 
    provideRouter(APP_ROUTES, withComponentInputBinding()),
    importProvidersFrom(TuiRootModule, RecaptchaV3Module),
    {
      provide: APP_INITIALIZER,
      useFactory: (themeSwitcherService: ThemeSwitcherService) => () => {
        themeSwitcherService.getThemeStateFromLocalStorage()
      },
      deps: [ThemeSwitcherService],
      multi: true
    },
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: '6LcEThkqAAAAAL4Xk3RUZFaguDbdaUHkYlAABt8H',
    },
  ]
};
