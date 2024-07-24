import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeSwitcherService } from '@core/services/theme-switcher.service';
import { TUI_BUTTON_OPTIONS, TuiButtonModule } from '@taiga-ui/core';
import { tuiIconMoon, tuiIconSun } from '@taiga-ui/icons';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'app-theme-switch',
  standalone: true,
  imports: [TuiButtonModule],
  templateUrl: './theme-switch.component.html',
  styleUrl: './theme-switch.component.scss',
  providers: [
    {
      provide: TUI_BUTTON_OPTIONS,
      useValue: {
        appearance: 'secondary',
        size: 's',
        shape: 'rounded',
      },
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeSwitchComponent {
  private _themeService = inject(ThemeSwitcherService)

  public get icon(): PolymorpheusContent {
    return this._themeService.isOnLight ? tuiIconSun : tuiIconMoon
  }

  public toggleTheme(): void {
    this._themeService.toggleTheme()
  }
}
