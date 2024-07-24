
import { Routes } from '@angular/router';
import { SignInComponent, SignUpComponent } from '@core/auth';
import { signedInGuard } from '@core/auth/guards/signed-in.guard';
import { unSignedInGuard } from '@core/auth/guards/unsigned-in.guard';
import { ErrorPageComponent } from '@core/components/error-page';
import { AppRoutes } from '@core/constants/enums'

export const APP_ROUTES: Routes = [
    { path: AppRoutes.SIGN_IN, component: SignInComponent, canActivate: [signedInGuard] },
    { path: AppRoutes.SIGN_UP, component: SignUpComponent, canActivate: [signedInGuard] },
    {
        path: AppRoutes.DASHBOARD,
        canActivate: [unSignedInGuard],
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    },
    { path: '', pathMatch: 'full', redirectTo: AppRoutes.SIGN_IN },
    { path: '**', pathMatch: 'full', component: ErrorPageComponent },
    
];
