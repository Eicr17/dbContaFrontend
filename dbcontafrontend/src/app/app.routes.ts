import { Routes } from '@angular/router';
import { TipoArticuloComponent } from './Componentes/tipo-articulo/tipo-articulo.component';
import { ArticuloComponent } from './Componentes/Componente-Articulo/articulo/articulo.component';
import { EmpresaComponent } from './Componentes/Componente-Empresa/empresa/empresa.component';
import { DocumentoComponent } from './Componentes/Componente-Documento/documento/documento.component';
import { LoginComponent } from './Componentes/Componente-Login/login/login.component';
import { AuthService } from './Servicios/auth.service';
import { authGuard } from './guards/auth.guard';
import { HomeComponent } from './Home/home.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
export const routes: Routes = [
    
    { path: '', redirectTo: 'login', pathMatch: 'full' },


    {
        path: 'login',
        component: LoginComponent,
    },

    {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [

      { path: 'home', component: HomeComponent },

      { path: 'Articulo', component: ArticuloComponent },
      { path: 'TipoArticulo', component: TipoArticuloComponent },
      { path: 'Empresa', component: EmpresaComponent },
      { path: 'Documento', component: DocumentoComponent }

    ]

  },

   
 { path: '**', redirectTo: 'login' }   

];
