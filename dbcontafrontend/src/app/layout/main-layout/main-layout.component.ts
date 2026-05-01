import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../Servicios/auth.service';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

    idUsuario: string | null = null;

    constructor(  private router: Router, private auth: AuthService){

    }

    ngOnInit(){
      this.idUsuario = this.auth.getIdUsuario();
    }


  logout(){
      sessionStorage.removeItem('token');
      this.router.navigate(['/Login'])
  }
}
