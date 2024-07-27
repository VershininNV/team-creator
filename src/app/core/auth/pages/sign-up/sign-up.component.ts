import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutes } from '@core/constants';
import { ActionCardComponent, EmailInputComponent, PasswordInputComponent } from '@shared/ui';
import { TuiButtonModule} from '@taiga-ui/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, NgIf,
            TuiButtonModule, ActionCardComponent, EmailInputComponent,
            PasswordInputComponent
            ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  public registerAccount(): void {
    this.router.navigateByUrl(AppRoutes.SIGN_IN)
  }
}
