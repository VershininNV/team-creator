import { TuiInputModule, TuiIslandModule } from '@taiga-ui/kit';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButtonModule } from '@taiga-ui/core';
import { BehaviorSubject, of } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [TuiIslandModule, TuiInputModule, ReactiveFormsModule, 
            TuiButtonModule, AsyncPipe, NgIf
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ForgotPasswordComponent {
  public forgotForm = new FormGroup({
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^([a-zA-Z0-9._-]+)@([a-z]+)\\.([a-z]{2,3})$')
      
    ])),
  })

  public isEmailChecking$ = new BehaviorSubject<boolean>(false)
  public isEmailChecked$ = new BehaviorSubject<boolean>(false)
  public isRequestSended$ = new BehaviorSubject<boolean>(false)

  public get isEmailValidated(): boolean {
    return this.forgotForm.get('email')?.valid!
  }

  public get email(): string {
    return this.forgotForm.get('email')?.value!
  }
  public checkEmail(): void {
    this.isEmailChecking$.next(true)
    setTimeout(() => {
      this.isEmailChecking$.next(false)
      this.isEmailChecked$.next(true)
    }, 1000)
  }

  public sendRequest(): void {
    this.isRequestSended$.next(true)
  }
}
