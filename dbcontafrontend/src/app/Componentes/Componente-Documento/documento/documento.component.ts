import { Component } from '@angular/core';
import { DocumentoService } from '../../../Servicios/documento.service';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { DocumentoMd } from '../../../Modelos/DocumentoMdl';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-documento',
  imports: [CommonModule, ReactiveFormsModule, MatPaginatorModule, FormsModule],
  templateUrl: './documento.component.html',
  styleUrl: './documento.component.css'
})
export class DocumentoComponent {

  pCriterioBusqueda : string = "";
  lstDocumento: DocumentoMd []  = [] ;

  constructor( private srv_Documento: DocumentoService){
    
  }

  ngOnInit(){

    this.ObtenerDocumento();

  }


  ObtenerDocumento(){
    this.srv_Documento.GetDocumento(this.pCriterioBusqueda)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        alert(error.message)
        throw error;
      })
    )

    .subscribe((resp) => {
      console.log(resp);
      this.lstDocumento = resp.datos;
    })
  }

}
