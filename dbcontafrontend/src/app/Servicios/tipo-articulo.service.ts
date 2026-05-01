import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TpArticulo } from '../Modelos/TipoArticulo';
import { RespuestaMdl } from '../Modelos/RespuestaMdl';
import { TipoArticuloCreacion } from '../Modelos/TipoArticuloCreacionMdl';
import { Observable } from 'rxjs';
import { ArticuloActualizar } from '../Modelos/ArticuloActualizarMdl';
import { TpActActualizar } from '../Modelos/TipoArticuloActualizarMdl';

@Injectable({
  providedIn: 'root'
})
export class TipoArticuloService {

  constructor(private  http: HttpClient) {


   }

    getTipoArticulo(pCriterioBusqueda : string)
      {
         return this.http.get<RespuestaMdl<TpArticulo>>(
          `http://localhost:5122/api/TipoArticulo/Get?pBusqueda=${pCriterioBusqueda}`
         );
        }

        
      TipoArticuloAgregar(data: TipoArticuloCreacion) :Observable<any>{
         return this.http.post(
             `http://localhost:5122/api/TipoArticulo/Insertar`, data
         );

      }

     TipoArticuloEliminar(idTpArt: number) : Observable<any>{
        return this.http.delete(
          `http://localhost:5122/api/TipoArticulo/Eliminar/${idTpArt}`
        );
     }

     TipoArticuloEditar(Act: TpActActualizar): Observable<any>{
       return this.http.post<any>(
        `http://localhost:5122/api/TipoArticulo/Actualizar`, Act
       )    
     }

  

    
}

