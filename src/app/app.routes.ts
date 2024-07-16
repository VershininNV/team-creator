import { Routes } from '@angular/router';
import { ErrorPageComponent } from '@core/components/error-page';
import { AppRoutes } from '@core/constants/enums'

export const APP_ROUTES: Routes = [
    {
        path: AppRoutes.HOME,
        loadChildren: () =>
          import('./features/home/home.module').then(m => m.HomeModule),
    },
    { path: '**', pathMatch: 'full', component: ErrorPageComponent },
];
