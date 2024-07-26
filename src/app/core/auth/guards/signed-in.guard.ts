import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AppRoutes } from '@core/constants';

export const signedInGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const isUserSignedIn = false
  const router = inject(Router)

  if(isUserSignedIn) {
    if(state.url.includes(AppRoutes.SIGN_IN) || 
      state.url.includes(AppRoutes.SIGN_UP) || 
      state.url.includes(AppRoutes.RECOVER_PASSWORD)) 
    {
      router.navigateByUrl(AppRoutes.DASHBOARD)

      return true
    }
  }
  
  return true
};
