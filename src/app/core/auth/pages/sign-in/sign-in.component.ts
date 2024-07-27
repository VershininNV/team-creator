import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutes } from '@core/constants';
import { ActionCardComponent, EmailInputComponent, PasswordInputComponent } from '@shared/ui';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';
import { BehaviorSubject, of } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, TuiButtonModule, TuiSvgModule,
            AsyncPipe, NgIf, ActionCardComponent,
            EmailInputComponent, PasswordInputComponent ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SignInComponent { 
  public signinForm = new FormGroup({
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^([a-zA-Z0-9._-]+)@([a-z]+)\\.([a-z]{2,3})$')
      
    ])),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  public isEmailChecking$ = new BehaviorSubject<boolean>(false)
  public isEmailChecked$ = new BehaviorSubject<boolean>(false)

  private router = inject(Router)

  public checkEmail(): void {
    this.isEmailChecking$.next(true)
    setTimeout(() => {
      this.isEmailChecking$.next(false)
      this.isEmailChecked$.next(true)
    }, 1000)
  }

  public createAccount(): void {
    this.router.navigateByUrl(AppRoutes.SIGN_UP)
  }

  public recoverPassword(): void {
    this.router.navigateByUrl(AppRoutes.FORGOT_PASSWORD)
  }
}
