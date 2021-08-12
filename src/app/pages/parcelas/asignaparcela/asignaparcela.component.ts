import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm, NgModel } from '@angular/forms';
import { MercadillosService } from '../../../services/mercadillos.service';
import { UsuarioModel } from '../../../models/usuario.model';
import { ActividadesInterface } from '../../../interfaces/actividades-response';
import { MovimientoModel } from '../../../models/movimiento.model';
import { ParcelaModel } from '../../../models/parcela.model';
import { combineLatest } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-asignaparcela',
  templateUrl: './asignaparcela.component.html',
  styleUrls: ['./asignaparcela.component.css']
})
export class AsignaparcelaComponent implements OnInit {

  public buscarPersonas = new UsuarioModel();
  public listadoActividades : ActividadesInterface[] = []; 
  public mercadillo : string;
  public parcela : string;
  public id : string;
  public nuevoMovimiento = new MovimientoModel();
  public modificaParcela = new ParcelaModel();

 

  constructor(private mercadillosService : MercadillosService,
              private route : ActivatedRoute) { }

  ngOnInit(): void {
   
    this.modificaParcela.COD_ESTADO = "A";
    
    this.parcela = this.route.snapshot.paramMap.get('par');
    //console.log("Numero Parcela : " + this.parcela);
    this.id = this.route.snapshot.paramMap.get('id');
    //console.log("Parametro recibido " + this.id);
    this.mercadillo = this.route.snapshot.paramMap.get('mercadillo');
    //console.log("Mercadillo : " + this.mercadillo);
    this.mercadillosService.getActividades()
        .subscribe( resp => {
          this.listadoActividades = resp;
        })

  }


  buscarUsuario(){  //(termino : string){
  
    this.mercadillosService.buscarUsuarioNif(this.buscarPersonas.NIF)
        .subscribe( (resp: any) => {
          if (resp.length>0) {
            this.buscarPersonas = resp[0];
            console.log(resp.length)   

          }  else {
            Swal.fire({
              title : "Error",
              text : 'Usuario no encontrado',
              icon : 'warning'
            });
            this.buscarPersonas = new UsuarioModel();
          }      
        });

  }

  guardar(forma: NgForm) {

    // IMPORTANTE : NO SOLO HAY QUE GUARDAR EL MOVIMIENTO,
    // TAMBIEN HAY QUE CAMBIAR EL ESTADO DE LA PARCELA Y PONERLO COMO ASIGNADO


    if (forma.invalid) {
      // recorrer los elementos del formulario para que se dispare las validaciones
      Object.values(forma.controls).forEach((control) => {
        control.markAsTouched(); //Lo pongo como pulsado
      });
      return;
    }
   // console.log("Datos de la Persona");
   // console.log(this.buscarPersonas);
    this.nuevoMovimiento.IDPARCELA = Number(this.id);
    this.nuevoMovimiento.TITULAR = this.buscarPersonas.IDPERSONA;
   // console.log("Datos que se tienen que guardar");
   // console.log(this.nuevoMovimiento);

    this.modificaParcela.IDPARCELAS = Number(this.id);
    this.modificaParcela.COD_ESTADO = "A";
   // console.log("DATOS PARCELA A MODIFICAR");
   // console.log(this.modificaParcela);

    combineLatest([
      this.mercadillosService.modificaEstadoParcela(this.modificaParcela),
      this.mercadillosService.newMovimiento(this.nuevoMovimiento)
    ]).subscribe( ([resp,resp2]) =>{

      Swal.fire({
        title : 'Asignado',
        text : 'Se asigna parcela correctamente..',
        icon : 'success'
      });

      this.buscarPersonas = new UsuarioModel();

    });


   /*
    this.mercadillosService.modificaEstadoParcela(this.modificaParcela)
        .subscribe ( resp => {
          console.log(resp);
        });

    this.mercadillosService.newMovimiento(this.nuevoMovimiento)
        .subscribe( resp => {
          Swal.fire({
            title : 'Asignado',
            text : 'Se asigna parcela correctamente..',
            icon : 'success'
          });
        })
   */

  }

}
