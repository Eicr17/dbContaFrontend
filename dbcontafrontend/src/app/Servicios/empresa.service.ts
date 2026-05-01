import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaMdl } from '../Modelos/RespuestaMdl';
import { EmpresaMd } from '../Modelos/EmpresaMdl';
import { CreadionEmpreasaMdl } from '../Modelos/EmpresaCreacionMdl';
import { Observable } from 'rxjs';
import { EditarEmpresaMdl } from '../Modelos/EmpresaActualizarMdl';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) {

  }

  getEmpresa(pCriterioBusqueda: string) {
    return this.http.get<RespuestaMdl<EmpresaMd>>(
      `http://localhost:5122/api/Empresa/Obtener?pCriterioBusqueda=${pCriterioBusqueda}`
    );
  }


  InsertEmpresa(data: CreadionEmpreasaMdl): Observable<any> {
    return this.http.post(
      `http://localhost:5122/api/Empresa/Insertar`, data
    )
  }

  EditarEmpresa(data: EditarEmpresaMdl): Observable<any> {
    return this.http.post<any>(
      `http://localhost:5122/api/Empresa/Actualizar`, data

    )

  }

  EliminarEmpresa(idEmp: number): Observable<any> {
    return this.http.delete(
      `http://localhost:5122/api/Empresa/Eliminar/${idEmp}`

    )
  }


}
