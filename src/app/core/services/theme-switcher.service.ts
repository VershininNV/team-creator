import { Inject, Injectable } from '@angular/core';
import { TuiBrightness } from '@taiga-ui/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeSwitcherService {
  private _themeState: TuiBrightness = 'onLight'
  private _localStorageVariableName = 'theme'

  get mode(): TuiBrightness | null {
    return this._themeState
  }

  get isOnLight(): boolean {
    return this._themeState === 'onLight'
  }

  public toggleTheme(): void {
    this._themeState === 'onLight' ? this._themeState = 'onDark' : this._themeState = 'onLight'
    localStorage.setItem(this._localStorageVariableName, this._themeState)
  }

  public getThemeStateFromLocalStorage(): void {
    const stateFromStorage = localStorage.getItem(this._localStorageVariableName)

    if(stateFromStorage) {
      this._themeState = stateFromStorage as TuiBrightness
    }
  }
}
