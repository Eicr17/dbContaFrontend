import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private apiUrl = "http://localhost:5122/api/Login";
  constructor( private http : HttpClient, private router: Router) {
  
   }

   login(data: any){
     return this.http.post<any>(this.apiUrl, data);
   }


   guardarTok(token: string){
      sessionStorage.setItem('token',token)

      const expiracion  = new Date().getTime() + (5*60*1000);
      sessionStorage.setItem('token_expiracion', expiracion.toString());
   }



   getToken(): string | null{
        if(this.isTokenExpirado())
        { 
          this.logout();
          return null;
        }

        return sessionStorage.getItem('token')
   }

   isTokenExpirado(): boolean{
      const expiracion =  sessionStorage.getItem('token_expiracion');

      if(!expiracion) return true;

      const ahora = new Date().getTime();
      return ahora > parseInt(expiracion);
   }

   getExpiracionDesdeJWT(): number | null{
    const token = sessionStorage.getItem('token');
    if(!token) return null;
    try{
        const payLoad = JSON.parse(atob(token.split('.')[1]));
        return payLoad.exp ? payLoad.exp * 1000 : null
    }catch{
      return null;
    }
   }

    isTokenExpiradoJwt(): boolean{
      const token = sessionStorage.getItem('token')
      
      if(!token) return false;

      const exp = this.getExpiracionDesdeJWT();
      if(!exp) return false;
 
      return new Date().getTime() > exp;
    }

   logout(){
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('token_expiracion');
        this.router.navigate(['/login'])
   }

   isAutenticado(){
      return !!this.getToken() && !this.isTokenExpiradoJwt();
   }


   getIdUsuario(): string | null{
    try{
        const token = sessionStorage.getItem('token');
        const payLoad = JSON.parse(atob(token!.split('.')[1]));
        return payLoad['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] ?? null;
    }catch{
        return null;
    }
   }

}
