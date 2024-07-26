import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutes } from '@core/constants';
import { PasswordValidator } from '@core/models';
import { TuiButtonModule, TuiHintModule, TuiSvgModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiBadgeModule, TuiInputModule, TuiIslandModule, TuiStatus } from '@taiga-ui/kit';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [TuiIslandModule, ReactiveFormsModule, AsyncPipe,
            NgIf, TuiButtonModule, TuiInputModule, 
            TuiTextfieldControllerModule, NgFor, TuiBadgeModule, TuiHintModule, TuiSvgModule,
            ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent {
  public signupForm = new FormGroup({
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^([a-zA-Z0-9._-]+)@([a-z]+)\\.([a-z]{2,3})$')
      
    ])),
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

  public isEmailChecking$ = new BehaviorSubject<boolean>(false)
  public isEmailChecked$ = new BehaviorSubject<boolean>(false)

  private router = inject(Router)

  public get isEmailValidated(): boolean {
    return this.signupForm.get('email')?.valid!
  }

  

  public checkEmail(): void {
    this.isEmailChecking$.next(true)
    setTimeout(() => {
      this.isEmailChecking$.next(false)
      this.isEmailChecked$.next(true)
    }, 1000)
  }

  public getBadgeIcon(status: TuiStatus): string {
    return status === 'success' ? 'tuiIconCheck' : 'tuiIconClose' 
  }

  public getBadgeValue(patterns: string[]): TuiStatus {
    let patternsCheckValues: boolean[] = []

    patterns.forEach((value) => {
      let pattern = new RegExp(value)
      patternsCheckValues.push(pattern.test(this.signupForm.get('password')?.value!))
    })

    return patternsCheckValues.every((value) => value === true) ? 'success' : 'error'
  }

  public registerAccount(): void {
    this.router.navigateByUrl(AppRoutes.SIGN_IN)
  }
}
