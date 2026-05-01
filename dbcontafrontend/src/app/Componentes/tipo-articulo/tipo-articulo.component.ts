import { Component } from '@angular/core';
import { TpArticulo } from '../../Modelos/TipoArticulo';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TipoArticuloService } from '../../Servicios/tipo-articulo.service';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
declare var bootstrap: any;



@Component({
  selector: 'app-tipo-articulo',
  imports: [CommonModule, ReactiveFormsModule, MatPaginatorModule, FormsModule],
  templateUrl: './tipo-articulo.component.html',
  styleUrl: './tipo-articulo.component.css'
})
export class TipoArticuloComponent {


  FormularioTipoArticulo!: FormGroup;

  lstTipoArticulo: TpArticulo[] = [];
  pCriterioBusqueda: string = '';


  pagDesde: number = 0;
  pagHasta: number = 5;


  constructor(private _srvTipoArticulo: TipoArticuloService,
    private fb: FormBuilder) {

  }

  ngOnInit() {

    this.FormularioTipoArticulo = this.fb.group({
      idtipoArticulo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      usuarioCreacion: ['admin']

    })

    
    this.FormularioTipoArticulo.controls['idtipoArticulo'].disable();
    this.getTipoArticulo();
  }


  getTipoArticulo() {

    this._srvTipoArticulo.getTipoArticulo(
      this.pCriterioBusqueda
    )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          alert(error.message);
          throw error;
        })
      )
      .subscribe((resp) => {
        console.log("RESPUESTA:", resp);
        this.lstTipoArticulo = resp.datos;
      })
  }


  TipoArticuloInsert() {
    if (this.FormularioTipoArticulo.invalid) {
      Swal.fire({
        title: "Formulario Invalido",
        text: "Error completa todos los campos",
        icon: "warning"
      });
      return;
    }
    this._srvTipoArticulo.TipoArticuloAgregar(this.FormularioTipoArticulo.value
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
        }

        );
        const ModalElement = document.getElementById('ModalInsert')
        const modal = bootstrap.Modal.getOrCreateInstance(ModalElement);
        modal.hide();
        this.ResetTipoArticulo();
        this.getTipoArticulo();
      })

  }


  TipoArticuloEditar() {

    if (this.FormularioTipoArticulo.invalid) {
      Swal.fire({
        title: "Formulario Invalido",
        text: "Error completa todos los campos",
        icon: "warning"
      });
      return;
    }


    this._srvTipoArticulo.TipoArticuloEditar(this.FormularioTipoArticulo.value
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
        this.ResetTipoArticulo();
        this.getTipoArticulo();

      })
  }

  TipoArticuloDelete(idtpArt: number) {
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
        this._srvTipoArticulo.TipoArticuloEliminar(idtpArt).subscribe({
          next: () => {
            Swal.fire({
              title: "Eliminado!",
              text: "El registro ha sido eliminado.",
              icon: "success"
            });

            this.FormularioTipoArticulo.reset();
            this.getTipoArticulo();
          },
          error: (err) => console.error(err)
        });
      } else {
        Swal.fire({
          title: "Cancelado",
          text: "No se eliminó el registro",
          icon: "info"
        });
      }

    });
  }

  ResetTipoArticulo() {
    this.FormularioTipoArticulo.reset({
      idtipoArticulo: null,
      nombre: null,
      descripcion: null,
      usuarioCreacion: 'admin',
    });
  }


 EditarTpArticuloValue(item: any){
  this.FormularioTipoArticulo.patchValue({
    idtipoArticulo: item.idtipoArticulo

  })
 }


  cambiarPagina(e: PageEvent) {
    this.pagDesde = e.pageIndex * e.pageSize;
    this.pagHasta = this.pagDesde + e.pageSize;
  }


}
