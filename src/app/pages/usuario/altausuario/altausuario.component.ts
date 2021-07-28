import { Component, OnInit } from '@angular/core';

import { NgForm , NgModel } from '@angular/forms';
import { Observable } from 'rxjs';

import { MercadillosService } from '../../../services/mercadillos.service';
import { Sexo, Tipovia } from 'src/app/interfaces/mercadillos-response';
import { UsuarioModel } from '../../../models/usuario.model';

import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-altausuario',
  templateUrl: './altausuario.component.html',
  styleUrls: ['./altausuario.component.css']
})
export class AltausuarioComponent implements OnInit {

  tipoSexo : Sexo[] = [];
  vias : Tipovia[] = [];

  usuario = new UsuarioModel();


  constructor(private mercadillosService : MercadillosService,
              private route : ActivatedRoute) { 
  }

  ngOnInit(): void {
    //Captura el Id del heroe si viene como parametro en la url
    
    const id= this.route.snapshot.paramMap.get('id');
  
    console.log(id);
    
    if (id !=='nuevo'){  //Voy a modificar un heroe
      this.mercadillosService.buscarUsuarioId(id)
        .subscribe( (resp : UsuarioModel) =>{
          this.usuario = resp[0];
          this.usuario.IDPERSONA = parseInt(id);
          //console.log("Numero Tipo Via ");
          //console.log(this.usuario.TIPOVIA);
        });  
    }
    
    this.cargaCombox();
 

  }

  
  cargaCombox(){
    this.mercadillosService.getSexo()
      .subscribe( resp => {
        this.tipoSexo = resp;
      });
    
    this.mercadillosService.getTipoVia()
        .subscribe( resp => {
          this.vias = resp;
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

  
    if (this.usuario.IDPERSONA !==0 ){
      peticion = this.mercadillosService.updateUsuario(this.usuario);
    } else { //NUEVO REGISTRO  
      peticion = this.mercadillosService.crearUsuario(this.usuario);   
    }

      peticion.subscribe( resp => {
        
        Swal.fire({
          title : this.usuario.NOMBRE,
          text : 'Se actualizo correctamente..',
          icon : 'success'
        });

        });
  

  /*  console.log("Antes de Llamar al Servicio");
    console.log(this.usuario);

    this.mercadillosService.crearUsuario(this.usuario)
      .subscribe( resp => {
        console.log("Usuario Almacenado");
      });

    console.log(forma.value);
    
    console.log("OBJETO USUARIO VALOR");
    console.log(this.usuario); 
  }
*/
  }
}