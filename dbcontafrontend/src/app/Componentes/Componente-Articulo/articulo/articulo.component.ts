import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, } from 'rxjs';
import { ArticuloMdl } from '../../../Modelos/ArticuloMdl';
import { ArticuloService } from '../../../Servicios/articulo.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticuloCreacion } from '../../../Modelos/ArticuloCreacionMdl';
import { TpArticulo } from '../../../Modelos/TipoArticulo';
import { ArticuloActualizar } from '../../../Modelos/ArticuloActualizarMdl';
import Swal from 'sweetalert2'
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TipoArticuloService } from '../../../Servicios/tipo-articulo.service';


declare var bootstrap: any;


@Component({
  selector: 'app-articulo',
  imports: [CommonModule, ReactiveFormsModule, MatPaginatorModule, FormsModule],
  templateUrl: './articulo.component.html',
  styleUrl: './articulo.component.css'
})
export class ArticuloComponent {

  FormularioArticulo!: FormGroup;

  lstArticulo: ArticuloMdl[] = [];
  lstTipoArticulo: TpArticulo[] = [];
  pCriterioBusqueda: string = '';

  pagDesde: number = 0;
  pagHasta: number = 5;


  constructor(private _srvArticulo: ArticuloService,
    private _srvTipoArticulo: TipoArticuloService,
    private fb: FormBuilder,
  ) {

  }


  ngOnInit() {
    this.FormularioArticulo = this.fb.group({
      idArticulo: ['',[Validators.required]],
      idTipoArticulo: ['', [Validators.required]],
      nombre: ['', [Validators.required, Validators.maxLength(150), Validators.minLength(50)]],
      descripcion: ['', [Validators.required, Validators.maxLength(150), Validators.minLength(50)]]

    })
        this.FormularioArticulo.controls['idArticulo'].disable();    

    this.getArticulo();
    this.getTipoArticulo();
  }


  getTipoArticulo() {

    this._srvTipoArticulo.getTipoArticulo(this.pCriterioBusqueda)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          Swal.fire({
            title: "Error",
            text: error.message || "Error en la respuesta",
            icon: "error"
          });

          throw error;
        })
      )
      .subscribe((resp) => {
        console.log("RESPUESTA:", resp);
        this.lstTipoArticulo = resp.datos;
      })
  }

  getArticulo() {
    this._srvArticulo.getArticulo(this.pCriterioBusqueda)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          Swal.fire({
            title: "Error",
            text: error.message || "Error en la respuesta",
            icon: "error"
          });

          throw error;
        })
      )
      .subscribe((resp) => {
        console.log(resp);
        this.lstArticulo = resp.datos;

      })

  }


  ArticuloInsert() {

    if (this.FormularioArticulo.invalid) {
      Swal.fire({
        title: "Formulario Invalido",
        text: "Error completa todos los campos",
        icon: "warning"
      });
      return;
    }

    this._srvArticulo.GuardarArticulo(
      this.FormularioArticulo.value
    )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          Swal.fire({
            title: "Error",
            text: error.message || "Error en la respuesta",
            icon: "error"
          });

          throw error;
        })
      )
      .subscribe((resp) => {
        Swal.fire({
          title: "Registro Insertado Exitosamente!",
          icon: "success",
          draggable: true
        });

        const ModalElement = document.getElementById('ModalInsert');
        const modal = bootstrap.Modal.getOrCreateInstance(ModalElement);
        modal.hide();
        this.ResetArticulo();
        this.getArticulo();


      })
  }


  EditarArticulo() {

    if (this.FormularioArticulo.invalid) {
      Swal.fire({
        title: "Formulario Invalido",
        text: "Error completa todos los campos",
        icon: "warning"
      });
      return;

    }
    this._srvArticulo.ArticuloEditar(this.FormularioArticulo.value
    )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          alert(error.message);
          throw error;
        })
      )
      .subscribe((resp) => {
        Swal.fire({
          title: "Actualizado!",
          text: "EL Registro ha sido actualizado.",
          icon: "success"
        });


        const ModalElement = document.getElementById('EditModal');
        const modal = bootstrap.Modal.getOrCreateInstance(ModalElement);
        modal.hide();
        this.ResetArticulo();
        this.getArticulo();

      }
      )

  }


  ArticuloDelete(idArt: number, idTpArt: number) {

    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta opción no se podrá revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this._srvArticulo.EliminarArticulo(idArt, idTpArt).subscribe({
          next: () => {
            Swal.fire({
              title: "Eliminado!",
              text: "El registro ha sido eliminado.",
              icon: "success"
            });

            this.FormularioArticulo.reset();
            this.getArticulo();
          },
          error: (err) => console.error(err)
        });
      }
    });
  }

  cambiarPagina(e: PageEvent) {
    console.log(e.pageIndex);
    console.log(e.pageSize);
    this.pagDesde = e.pageIndex * e.pageSize;
    this.pagHasta = this.pagDesde + e.pageSize;

  }


  ResetArticulo() {

    this.FormularioArticulo.reset({
      idTipoArticulo: null,
      nombre: null,
      descripcion: null,
    });


  }


  EditarArticuloValue(item : any){
    this.FormularioArticulo.patchValue({
      idArticulo : item.idArticulo
    })
  }


}
