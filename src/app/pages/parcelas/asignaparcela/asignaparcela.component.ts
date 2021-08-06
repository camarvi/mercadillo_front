import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm, NgModel } from '@angular/forms';
import { MercadillosService } from '../../../services/mercadillos.service';
import { UsuarioModel } from '../../../models/usuario.model';
import { ActividadesInterface } from '../../../interfaces/actividades-response';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignaparcela',
  templateUrl: './asignaparcela.component.html',
  styleUrls: ['./asignaparcela.component.css']
})
export class AsignaparcelaComponent implements OnInit {

  public buscarPersonas = new UsuarioModel();
  public listadoActividades : ActividadesInterface[] = []; 


  constructor(private mercadillosService : MercadillosService,
              private route : ActivatedRoute) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    console.log("Parametro recibido " + id);
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
      console.log(forma);
  }

}
