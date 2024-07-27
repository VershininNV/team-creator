import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutes } from '@core/constants';
import { PasswordValidator } from '@core/models';
import { TuiButtonModule, TuiHintModule, TuiSvgModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TUI_PASSWORD_TEXTS, TuiBadgeModule, TuiInputPasswordModule, tuiInputPasswordOptionsProvider, TuiIslandModule, TuiStatus } from '@taiga-ui/kit';
import { of } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [TuiIslandModule, TuiInputPasswordModule, TuiBadgeModule,
            TuiSvgModule, TuiButtonModule, TuiTextfieldControllerModule,
            NgFor, NgIf, TuiHintModule, ReactiveFormsModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    tuiInputPasswordOptionsProvider({
        icons: {
            hide: 'tuiIconLockLarge',
            show: 'tuiIconUnlockLarge',
        },
    }),
    {
      provide: TUI_PASSWORD_TEXTS,
      useValue: of(['']),
  },
],
})

export class ResetPasswordComponent {
  @Input() email!: string;
  public resetPasswordForm = new FormGroup({
    password: new FormControl('', [
      Validators.required, 
      Validators.pattern('(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}')])
  })
  public passwordValidators: PasswordValidator[] = [
    { definition: 'более 8 символов', pattern: ['^.{8,}$']},
    { definition: 'заглавные и строчные символы', pattern: ['[A-Z]', '[a-z]']},
    { definition: 'цифры', pattern: ['[0-9]']},
    { definition: 'специальные символы', pattern: ['[!@#$%^&*]'], 
      tooltipIcon: 'tuiIconHelpCircle', tooltipText: 'Разрешённые символы: «!», «@», «#», «$», «%», «^», «&», «*»'}
  ]

  private router = inject(Router)

  public getBadgeIcon(status: TuiStatus): string {
    return status === 'success' ? 'tuiIconCheck' : 'tuiIconClose' 
  }

  public getBadgeValue(patterns: string[]): TuiStatus {
    let patternsCheckValues: boolean[] = []

    patterns.forEach((value) => {
      let pattern = new RegExp(value)
      patternsCheckValues.push(pattern.test(this.resetPasswordForm.get('password')?.value!))
    })

    return patternsCheckValues.every((value) => value === true) ? 'success' : 'error'
  }

  public resetPassword(): void {
    this.router.navigateByUrl(AppRoutes.SIGN_IN)
  }
}
