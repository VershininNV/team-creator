import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutes } from '@core/constants';
import { ActionCardComponent, PasswordInputComponent } from '@shared/ui';
import { TuiButtonModule } from '@taiga-ui/core';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [TuiButtonModule, ReactiveFormsModule, ActionCardComponent,
            PasswordInputComponent
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ResetPasswordComponent {
  @Input() email!: string;
  public resetPasswordForm = new FormGroup({
    password: new FormControl('', [
      Validators.required, 
      Validators.pattern('(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}')])
  })

  private router = inject(Router)

  public resetPassword(): void {
    this.router.navigateByUrl(AppRoutes.SIGN_IN)
  }
}
