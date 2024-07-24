import { provideAnimations } from "@angular/platform-browser/animations";
import { TuiRootModule } from "@taiga-ui/core";
import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { APP_ROUTES } from './app.routes';
import { ThemeSwitcherService } from "@core/services/theme-switcher.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(), 
    provideRouter(APP_ROUTES, withComponentInputBinding()),
    importProvidersFrom(TuiRootModule),
    {
      provide: APP_INITIALIZER,
      useFactory: (themeSwitcherService: ThemeSwitcherService) => () => {
        themeSwitcherService.getThemeStateFromLocalStorage()
      },
      deps: [ThemeSwitcherService],
      multi: true
    },]
};
