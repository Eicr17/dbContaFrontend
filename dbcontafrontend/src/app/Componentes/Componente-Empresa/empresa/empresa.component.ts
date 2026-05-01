import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmpresaMd } from '../../../Modelos/EmpresaMdl';
import { EmpresaService } from '../../../Servicios/empresa.service';
import { catchError, identity } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
declare var bootstrap: any;

@Component({
  selector: 'app-empresa',
  imports: [CommonModule, ReactiveFormsModule, MatPaginatorModule, FormsModule],
  templateUrl: './empresa.component.html',
  styleUrl: './empresa.component.css'
})
export class EmpresaComponent {

  FormularioEmpresa!: FormGroup

  lstEmpresa: EmpresaMd[] = [];
  pCriterioBusqueda: string = '';


  pagDesde: number = 0;
  pagHasta: number = 5;

  constructor(private _srvEmpresa: EmpresaService,
    private fb: FormBuilder
  ) {

  }


  ngOnInit() {
    this.FormularioEmpresa = this.fb.group({
      idempresa: ['', [Validators.required] ],
      nombre: ['', [Validators.required, Validators.maxLength(150)]],
      nit: ['',[Validators.required, Validators.pattern(/^\d+$/)]]
    });

  

    this.FormularioEmpresa.controls['idempresa'].disable();    
    this.GetEmpresa();
  }

  


  GetEmpresa() {
    this._srvEmpresa.getEmpresa(this.pCriterioBusqueda)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          alert(error.message);
          throw error;
        })
      )
      .subscribe((resp) => {
        console.log(resp);
        this.lstEmpresa = resp.datos;

      })

  }

  EmpresaInsert() {
    if (this.FormularioEmpresa.invalid) {
      Swal.fire({
        title: "Formulario Invalido",
        text: "Error completa todos los campos",
        icon: "warning"
      });
      return;
    }
    this._srvEmpresa.InsertEmpresa(this.FormularioEmpresa.value
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
        this.ResetEmpresa();
        this.GetEmpresa();
      });
  }

  EmpresaActualizar() {
    if (this.FormularioEmpresa.invalid) {
      Swal.fire({
        title: "Formulario Invalido",
        text: "Error completa todos los campos",
        icon: "warning"
      });
      return;
    }
    this._srvEmpresa.EditarEmpresa(this.FormularioEmpresa.value
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
          title: "Registro Actualizado Exitosamente!",
          icon: "success",
          draggable: true
        }
        );
        const ModalElement = document.getElementById('EditModal')
        const modal = bootstrap.Modal.getOrCreateInstance(ModalElement);
        modal.hide();
        this.ResetEmpresa();
        this.GetEmpresa();
      })
  }

  EmpresaEliminar(idEmp: number) {
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
        this._srvEmpresa.EliminarEmpresa(idEmp).subscribe({
          next: () => {
            Swal.fire({
              title: "Eliminado!",
              text: "El registro ha sido eliminado.",
              icon: "success"
            });

            this.FormularioEmpresa.reset();
            this.GetEmpresa();
          },
          error: (err) => console.error(err)
        });
      } 
    });
  }

  ResetEmpresa() {
    this.FormularioEmpresa.reset({
      nombre: null,
      nit: null,
    });
  }



  cambiarPagina(e: PageEvent) {
    this.pagDesde = e.pageIndex * e.pageSize;
    this.pagHasta = this.pagDesde + e.pageSize
  }


  EditarEmpresa(item : any){
    this.FormularioEmpresa.patchValue({
      idempresa: item.idempresa
    })
  }


  abrilModal(){
    this.FormularioEmpresa.reset();
    this.FormularioEmpresa.markAllAsTouched();
  }

}
