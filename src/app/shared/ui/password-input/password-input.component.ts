import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PasswordValidator } from '@core';
import { TuiHintModule, TuiPrimitiveTextfieldModule, TuiSvgModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiBadgeModule, TuiStatus } from '@taiga-ui/kit';

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [TuiPrimitiveTextfieldModule, TuiSvgModule, TuiTextfieldControllerModule,
            NgIf, NgFor, TuiBadgeModule,
            TuiHintModule
  ],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => PasswordInputComponent),
    },
  ],
})

export class PasswordInputComponent implements ControlValueAccessor{
  private defaultValidators: PasswordValidator[] = [
    { definition: 'более 8 символов', pattern: ['^.{8,}$']},
    { definition: 'заглавные и строчные символы', pattern: ['[A-Z]', '[a-z]']},
    { definition: 'цифры', pattern: ['[0-9]']},
    { definition: 'специальные символы', pattern: ['[!@#$%^&*]'], 
      tooltipIcon: 'tuiIconHelpCircle', tooltipText: 'Разрешённые символы: «!», «@», «#», «$», «%», «^», «&», «*»'}
  ]
  private defaultPasswordPattern = new RegExp('(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}')

  @Input() isValidatorsShown = false
  @Input() validators = this.defaultValidators
  @Input() pattern = this.defaultPasswordPattern
  @Input() inputText = 'Введите пароль:'

  public inputValue = ''
  public isInvalid = false
  public disabled = false

  protected onTouched!: () => void;
  protected onChange!: (value: string) => void

  private isPasswordHidden = true;

  get icon(): string {
    return this.isPasswordHidden ? 'tuiIconLockLarge' : 'tuiIconUnlockLarge';
  }

  get inputType(): string {
    return this.isPasswordHidden ? 'password' : 'text';
  }

  public getBadgeIcon(status: TuiStatus): string {
    return status === 'success' ? 'tuiIconCheck' : 'tuiIconClose' 
  }

  public getBadgeValue(patterns: string[]): TuiStatus {
    let patternsCheckValues: boolean[] = []

    patterns.forEach((value) => {
      let pattern = new RegExp(value)
      patternsCheckValues.push(pattern.test(this.inputValue))
    })

    return patternsCheckValues.every((value) => value === true) ? 'success' : 'error'
  }

  togglePasswordVisibility(): void {
    this.isPasswordHidden = !this.isPasswordHidden;
  }

  changeValue(value: string): void {
    this.onChange(value)
    this.writeValue(value)
    if(this.defaultPasswordPattern.test(value)) {
      this.isInvalid = false
    } else {
      this.isInvalid = true
    }
  }

  writeValue(value: any): void {
    this.inputValue = value
  }

  registerOnChange(fn: (value: string) => void) {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled
  }
}
