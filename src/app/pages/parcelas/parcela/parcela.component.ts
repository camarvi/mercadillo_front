import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MercadillosService } from '../../../services/mercadillos.service';

import { MercadilloInterface } from '../../../interfaces/mercadillos-response';
import { ParcelaModel } from '../../../models/parcela.model';
import { ParcelaInterface } from 'src/app/interfaces/parcela-response';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';


import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-parcela',
  templateUrl: './parcela.component.html',
  styleUrls: ['./parcela.component.css'],
})
export class ParcelaComponent implements OnInit {

  datepipe: DatePipe = new DatePipe('en-US');
 
  listadoMercadillos: MercadilloInterface[] = [];

  parcela = new ParcelaModel();
  id : string;
  fecha_alta_html : string;

  parcelaBuscada = new ParcelaModel();

  constructor(
    private mercadilloService: MercadillosService,
    private route: ActivatedRoute,
    public datePipe: DatePipe,
    public router : Router

  ) {

   // this.router.routeReuseStrategy.shouldReuseRoute = () => false
  }

  

  ngOnInit(): void {

    
    this.id = this.route.snapshot.paramMap.get('id');

   
   // CODIGO SIN PROBAR
    //this.parcela=null;
    //this.parcela = new ParcelaModel();
    //
    //this.parcelaBuscada = null;
    //this.parcelaBuscada = new ParcelaModel();
   // FIN CODIGO SIN PROBAR 

    if (this.id !== 'nuevo') {
      this.mercadilloService
        .getParcelaId(this.id)
        .subscribe((resp: ParcelaInterface) => {
          this.parcela = resp[0];
          this.parcela.IDPARCELAS = parseInt(this.id);
          console.log("DATOS RECIBIDOS");
          console.log(this.parcela.FECHA_ALTA);
          let TuFecha = new Date(this.parcela.FECHA_ALTA);
          this.fecha_alta_html = TuFecha.toLocaleDateString('es-ES'); // toISOString();
          this.fecha_alta_html = this.conviertefecha(this.fecha_alta_html);
      });
    }
      
    this.cargaCombox();
  }


  cargaCombox() {
    this.mercadilloService.getMercadillos().subscribe((resp) => {
      this.listadoMercadillos = resp;
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

  if (this.id === 'nuevo') {

    let comprueba: Observable<any>;

    comprueba = this.mercadilloService.getParcelaNumMer(
      this.parcela.IDMERCADILLO.toString(),
      this.parcela.NUMERO.toString()
    );


    comprueba.subscribe((resp) => {
      this.parcelaBuscada = resp;
     // console.log("Resultado de Comprueba.subscribe");
     // console.log(this.parcelaBuscada[0]);
      if (resp[0]) {
        //console.log(resp[0]);
     //   this.parcelaBuscada.IDPARCELAS = resp[0].IDPARCELAS;
        Swal.fire({
          title:'ERROR : EN ALTA',
          text: 'El numero de Parcela ya existe..',
          icon: 'error',
        });
      } else {
        //ES UNA MODIFICACION
        this.almacenaRegistro();
      }

      this.parcela=null;
      this.parcela = new ParcelaModel();

      this.parcelaBuscada = null;
      this.parcelaBuscada = new ParcelaModel();
    });

  } else {
    this.almacenaRegistro();
  }

  
  }


  almacenaRegistro(){

    Swal.fire({
      allowOutsideClick: false,
      title: 'Espere',
      text: 'Guardando información..',
      icon: 'info',
    });
    Swal.showLoading();

    let peticion: Observable<any>;


    if (this.parcela.IDPARCELAS !== 0) {
     
      //console.log("Modifica Registro");
      //console.log(this.parcela);
      peticion = this.mercadilloService.modificaParcela(this.parcela);

    } else {
      console.log("Nuevo Registro");
      console.log(this.parcela.FECHA_ALTA);
      peticion = this.mercadilloService.newParcela(this.parcela);
    }

    
  //  this.parcela.FECHA_ALTA = this.datepipe.transform(this.parcela.FECHA_ALTA, 'yyyy-MM-dd');


    peticion.subscribe((resp) => {
      Swal.fire({
        title: "La Parcela ",
        text: 'Se almaceno correctamente..',
        icon: 'success',
      });
    });

   // this.router.navigate(['/user', this.parcela.IDMERCADILLO])
   // this.router.navigate(['/home']);


  }


  conviertefecha(fecharecibida)
  {
    var arrayFecha = fecharecibida.split('/');
    let dia: string = arrayFecha[0];
    let mes : string = arrayFecha[1];
    let anio : string = arrayFecha[2];

    if (dia.length==1) {
      dia = "0" + dia;
    }
    if (mes.length==1) {
      mes = "0" + mes;
    }
    let fechaok : string = dia + "/" + mes + "/" + anio;
   return  fechaok;
  }


  
}



