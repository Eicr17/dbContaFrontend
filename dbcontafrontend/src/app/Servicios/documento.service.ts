import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaMdl } from '../Modelos/RespuestaMdl';
import { DocumentoMd } from '../Modelos/DocumentoMdl';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  constructor( private http: HttpClient) { 

  }

  GetDocumento(pCriterioBusqueda: string) {
      return this.http.get<RespuestaMdl<DocumentoMd>>(
             `http://localhost:5122/api/Documento/Obtener?pCriterioBusqueda=${pCriterioBusqueda}`
      )
  }
}
