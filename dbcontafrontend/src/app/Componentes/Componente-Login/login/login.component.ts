import { Component } from '@angular/core';
import { AuthService } from '../../../Servicios/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    FormLogin! : FormGroup;

      constructor( private srvAuth : AuthService,
                  private fb : FormBuilder,
                  private router: Router
      ){

      }

    ngOnInit(){
        this.FormLogin = this.fb.group({
            userId: ['',[Validators.required]],
            password: ['', [Validators.required, Validators.maxLength(120)]]
        })
    }

      login(){
        if(this.FormLogin.invalid) 
          return;
      
        this.srvAuth.login(this.FormLogin.value).subscribe({
          next: (resp) =>{
              this.srvAuth.guardarTok(resp.token)
              this.router.navigate(['/home'])
          },
           error: (err) =>{
              console.error('Login Error',err)
           }
        })


      }

}
