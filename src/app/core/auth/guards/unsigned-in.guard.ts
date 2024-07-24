import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AppRoutes } from '@core/constants';

export const unSignedInGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const isUserSignedIn = true
  const router = inject(Router)

  if(!isUserSignedIn) {
    if(state.url.includes(AppRoutes.DASHBOARD)) 
    {
      router.navigateByUrl(AppRoutes.SIGN_IN)

      return true
    }
  }
  
  return true
};
