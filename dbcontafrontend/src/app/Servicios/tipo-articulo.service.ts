import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TpArticulo } from '../Modelos/TipoArticulo';
import { RespuestaMdl } from '../Modelos/RespuestaMdl';

@Injectable({
  providedIn: 'root'
})
export class TipoArticuloService {

  constructor(private  http: HttpClient) {


   }


    getTipoArticulo()
      {
         return this.http.get<RespuestaMdl<TpArticulo>>(
          `http://localhost:5122/api/TipoArticulo/Get`
         )
   
      }
      
}

