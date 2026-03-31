import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticuloMdl } from '../Modelos/ArticuloMdl';
import { RespuestaMdl } from '../Modelos/RespuestaMdl';
import { Observable } from 'rxjs';
import { ArticuloCreacion } from '../Modelos/ArticuloCreacionMdl';
import { ArticuloActualizar } from '../Modelos/ArticuloActualizarMdl';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  constructor(private http : HttpClient) {

   }

    
 
   getArticulo()
   {
      return this.http.get<RespuestaMdl<ArticuloMdl>>(
       `http://localhost:5122/api/Articulo/Obtener`
      )

   }
   
   EliminarArticulo(idArt:number, idTpArt: number) : Observable <any>
   {
        return this.http.delete
        (`http://localhost:5122/api/Articulo/Eliminar/${idArt}/${idTpArt}`

        );
    
   }


   GuardarArticulo(data: ArticuloCreacion) : Observable<any>{
    return this.http.post(
        `http://localhost:5122/api/Articulo/Insertar`,data

    )
   }


   ArticuloEditar( Act: ArticuloActualizar ): Observable<any>
   {
    
    return this.http.put<any>(
      `http://localhost:5122/api/Articulo/Actualizar`,Act
    );

   }



}
