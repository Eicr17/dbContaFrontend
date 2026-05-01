import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../Servicios/auth.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
        
    const authServices =inject(AuthService);
    const router = inject(Router);

  
        const token = sessionStorage.getItem('token');

        if(!token){
            return next(req);
        }

    if(authServices.isTokenExpiradoJwt()){
            authServices.logout();
            return throwError(() => new Error('Sesion Expirada'));
    }


    const clonedReq = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
    })
    
  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
        
        if(error.status === 401){
            authServices.logout();
            router.navigate(['/Login']);

    }
    return throwError(() => error)
 })
  );   
};
