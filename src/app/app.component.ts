import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER, TuiThemeNightModule, TuiModeModule, TuiBrightness } from "@taiga-ui/core";
import { Component, inject, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent, HeaderComponent } from "./core/layout";
import { ThemeSwitcherService } from "@core/services/theme-switcher.service";
import { NgIf } from "@angular/common";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TuiRootModule, TuiDialogModule, TuiAlertModule, FooterComponent, HeaderComponent,TuiThemeNightModule,
    TuiModeModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
    providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}]
})
export class AppComponent {
  private _themeService = inject(ThemeSwitcherService)
  
  get themeMode(): TuiBrightness | null {
    return this._themeService.mode
  }

  get isOnLight(): boolean {
    return this._themeService.isOnLight
  }
}
