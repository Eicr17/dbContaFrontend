import { HttpErrorResponse } from '@angular/common/http';
import { Component, } from '@angular/core';
import { catchError } from 'rxjs';
import { ArticuloMdl } from '../../../Modelos/ArticuloMdl';
import { ArticuloService } from '../../../Servicios/articulo.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticuloCreacion } from '../../../Modelos/ArticuloCreacionMdl';
import { TipoArticuloService } from '../../../Servicios/tipo-articulo.service';
import { TpArticulo } from '../../../Modelos/TipoArticulo';
import { ArticuloActualizar } from '../../../Modelos/ArticuloActualizarMdl';
import Swal from 'sweetalert2'
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
declare var bootstrap: any;


@Component({
  selector: 'app-Articulo',
  imports: [CommonModule, ReactiveFormsModule, MatPaginatorModule],
  templateUrl: './Articulo.component.html',
  styleUrl: './Articulo.component.css'
})
export class ArticuloComponent {

  FormularioAgregar!: FormGroup;
  FormularioEditar!: FormGroup;

  lstArticulo: ArticuloMdl[] = [];
  lstTipoArticulo: TpArticulo[] = [];
  lstArticuloForm: ArticuloCreacion[] = [];

  


   pagDesde : number =0;
   pagHasta: number=5;


  constructor(private _srvArticulo: ArticuloService,
    private _srvTipoArticulo: TipoArticuloService,
    private fb: FormBuilder
  ) {
    
  }



  

  ngOnInit() {
    this.FormularioAgregar = this.fb.group({

      idTipoArticulo: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      usuarioCreacion: ['admin']
         

    })

    this.FormularioEditar = this.fb.group({
      idArticulo: ['', Validators.required],
      idTipoArticulo: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      usuarioCreacion: ['admin']



    })
    this.getArticulo();
    this.getTipoArticulo();

    

  }





      



      
  ResetArticulo() {

    this.FormularioAgregar.reset({
      idTipoArticulo: null,
      nombre: null,
      descripcion: null,
      usuarioCreacion: 'admin'
    });

  }


  ResetArticuloEdit() {
    this.FormularioEditar.reset({
      idArticulo: null,
      idTipoArticulo: null,
      nombre: null,
      descripcion: null,
      usuarioCreacion: 'admin'
    });

  }



  getTipoArticulo() {

    this._srvTipoArticulo.getTipoArticulo()
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

  getArticulo() {
    this._srvArticulo.getArticulo()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          alert(error.message);
          throw error;
        })
      )
      .subscribe((resp) => {
        console.log(resp);
        this.lstArticulo = resp.datos;

      })

  }

  ArticuloDelete(idArt: number, idTpArt: number) {

    Swal.fire({
      title: "Estas Seguro?",
      text: "Esta Opcion no se revertira!",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si!"
    }).then((result) => {
      if (result.isConfirmed) Swal.fire({
        title: "Eliminado!",
        text: "El Registro a sido eliminado.",
        icon: "success"
      });
    }).then((result) => {

      this._srvArticulo.EliminarArticulo(idArt, idTpArt).subscribe({

        next: () => {
          Swal.fire({
            title: "Eliminado!",
            text: "El Registro ha sido eliminado.",
            icon: "success"
          });

          this.FormularioAgregar.reset();
          this.getArticulo();

        },
        error: (err) => console.error(err)
      });
    })

  }


  ArticuloInsert() {

    if (this.FormularioAgregar.invalid) {
      Swal.fire({
        title: "Formulario Invalido",
        text: "Error completa todos los campos",
        icon: "warning"
      });
      return;
    }

    this._srvArticulo.GuardarArticulo(
      this.FormularioAgregar.value
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

    if (this.FormularioEditar.invalid) {
      Swal.fire({
        title: "Formulario Invalido",
        text: "Error completa todos los campos",
        icon: "warning"
      });
      return;

    }
    this._srvArticulo.ArticuloEditar(this.FormularioEditar.value
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
        this.ResetArticuloEdit();
        this.getArticulo();

      }
      )

  }

  cambiarPagina(e : PageEvent){
    console.log(e.pageIndex);
    console.log(e.pageSize);
    this.pagDesde = e.pageIndex * e.pageSize;
    this.pagHasta =  this.pagDesde + e.pageSize;
    //console.log(this.pagDesde);
    //console.log(this.pagHasta);
  }


      
}