import { NgIf, AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, } from '@angular/forms';
import { TuiButtonModule, TuiPrimitiveTextfieldModule } from '@taiga-ui/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-email-input',
  standalone: true,
  imports: [TuiPrimitiveTextfieldModule, NgIf, TuiButtonModule,
            AsyncPipe],
  templateUrl: './email-input.component.html',
  styleUrl: './email-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => EmailInputComponent),
    },
  ],
})
export class EmailInputComponent implements ControlValueAccessor{
  @Input() isLoading = false
  @Input() inputText = 'Введите e-mail:'

  @Output() byButtonClick = new EventEmitter()

  public inputValue = ''
  public isInvalid = false
  public disabled = false

  public isNotEmailChanged$ = new BehaviorSubject<boolean>(false)
  
  protected onTouched!: () => void;
  protected onChange!: (value: string) => void

  private emailPattern = new RegExp('^([a-zA-Z0-9._-]+)@([a-z]+)\\.([a-z]{2,3})$')
  
  get isEmailValidated(): boolean {
    return !this.isInvalid && this.inputValue.length > 0
  }

  public checkEmail(): void {
    this.byButtonClick.emit()
    this.isNotEmailChanged$.next(true)
  }

  changeValue(value: string): void {
    this.onChange(value)
    this.writeValue(value)
    this.isNotEmailChanged$.next(false)
    if(this.emailPattern.test(value)) {
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
