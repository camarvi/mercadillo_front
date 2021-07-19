import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MercadillosService } from '../../../services/mercadillos.service';

import { MercadilloInterface } from '../../../interfaces/mercadillos-response';
import { ParcelaModel } from '../../../models/parcela.model';
import { ParcelaInterface } from 'src/app/interfaces/parcela-response';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-parcela',
  templateUrl: './parcela.component.html',
  styleUrls: ['./parcela.component.css']
})

export class ParcelaComponent implements OnInit {

  listadoMercadillos : MercadilloInterface[] = [];

  parcela = new ParcelaModel();
  
  constructor(private mercadilloService : MercadillosService,
              private route : ActivatedRoute) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'nuevo') {
      this.mercadilloService.getParcelaId(id)
        .subscribe( (resp : ParcelaInterface)=>{
          this.parcela = resp[0];
          this.parcela.IDPARCELAS = parseInt(id);
        });
    }

    this.cargaCombox();

  }

  cargaCombox(){
    this.mercadilloService.getMercadillos()
      .subscribe( resp => {
       // console.log(resp);
        this.listadoMercadillos = resp;
        console.log(this.listadoMercadillos);
      })
  }


  guardar( forma : NgForm){
    if (forma.invalid) {
      // recorrer los elementos del formulario para que se dispare las validaciones
      Object.values(forma.controls).forEach(control => {
        control.markAsTouched(); //Lo pongo como pulsado
      });
      return;
    }

    Swal.fire({
      allowOutsideClick : false,
      title : 'Espere',
      text: 'Guardando información..',
      icon : 'info'
    });
    Swal.showLoading();

    let peticion : Observable<any>;
    

    if (this.parcela.IDPARCELAS!==0) {
      peticion = this.mercadilloService.modificaParcela(this.parcela);
    } else {
      peticion = this. mercadilloService.newParcela(this.parcela);
    }

    peticion.subscribe((resp) => {
      Swal.fire({
        title: this.parcela.NUMERO,
        text: 'Se almaceno correctamente..',
        icon: 'success',
      });
    });


  }

}
