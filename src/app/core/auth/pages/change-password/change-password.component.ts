import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutes } from '@core/constants';
import { ActionCardComponent, PasswordInputComponent } from '@shared/ui';
import { TuiButtonModule } from '@taiga-ui/core';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, TuiButtonModule, ActionCardComponent,
            PasswordInputComponent
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ChangePasswordComponent {
  public changePasswordForm = new FormGroup({
    oldPassword: new FormControl('', [
    Validators.required, 
    Validators.pattern('(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}')]),
    newPassword: new FormControl('', [
      Validators.required, 
      Validators.pattern('(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}')])
  })

  private router = inject(Router)

  public changePassword(): void {
    this.router.navigateByUrl(AppRoutes.SIGN_IN)
  }
}
