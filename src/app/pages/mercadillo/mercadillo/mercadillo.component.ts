import { Component, OnInit } from '@angular/core';

import { NgForm, NgModel } from '@angular/forms';
import { Observable } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { MercadilloModel } from '../../../models/mercadillo.model';
import { DiaSemana } from '../../../interfaces/diasemana-response';
import { MercadillosService } from '../../../services/mercadillos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mercadillo',
  templateUrl: './mercadillo.component.html',
  styleUrls: ['./mercadillo.component.css'],
})
export class MercadilloComponent implements OnInit {
  listaDias: DiaSemana[] = [];
  multi_titular: boolean = false;
  mercadillo = new MercadilloModel();

  constructor(
    private mercadillosService: MercadillosService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    console.log('Parametro recibido ' + id);

    this.cargaCombo();

    if (id !== 'nuevo') {
      this.mercadillosService
        .buscarMercadilloId(id)
        .subscribe((resp: MercadilloModel) => {
          this.mercadillo = resp[0];
          this.mercadillo.IDMERCADILLO = parseInt(id);
          if (this.mercadillo.MULTITITULAR == 'S') {
            this.multi_titular = true;
          } else {
            this.multi_titular = false;
          }
        });
    }

    console.log(this.mercadillo);
  }

  cargaCombo() {
    this.mercadillosService.getDiaSemana().subscribe((resp) => {
      this.listaDias = resp;
    });
  }

  guardar(forma: NgForm) {
    if (forma.invalid) {
      // recorrer los elementos del formulario para que se dispare las validaciones
      Object.values(forma.controls).forEach((control) => {
        control.markAsTouched(); //Lo pongo como pulsado
      });
      return;
    }

    if (this.multi_titular) {
      this.mercadillo.MULTITITULAR = 'S';
    } else {
      this.mercadillo.MULTITITULAR = 'N';
    }

    Swal.fire({
      allowOutsideClick: false,
      title: 'Espere',
      text: 'Guardando información..',
      icon: 'info',
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if (this.mercadillo.IDMERCADILLO !==0) {
      peticion = this.mercadillosService.modificarMercadillo(this.mercadillo);
    } else {
      //NUEVO REGISTRO
      peticion = this.mercadillosService.crearMercadillo(this.mercadillo);
    }

    peticion.subscribe((resp) => {
      Swal.fire({
        title: this.mercadillo.DESCRIPCION,
        text: 'Se almaceno correctamente..',
        icon: 'success',
      });
    });

    this.mercadillo=null;
    this.mercadillo = new MercadilloModel();
  }
}
