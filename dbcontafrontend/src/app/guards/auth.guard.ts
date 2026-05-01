import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Servicios/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authSer = inject( AuthService);
  const router =  inject(Router);

  if(authSer.isAutenticado()){
      return true;
  }

  router.navigate(['/login']);
  return false;

  return true;
};
