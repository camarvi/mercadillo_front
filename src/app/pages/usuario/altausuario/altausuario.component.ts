import { Component, OnInit } from '@angular/core';

import { NgForm  } from '@angular/forms';
import { Observable } from 'rxjs';
import { combineLatest } from 'rxjs';

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
  nuevo : boolean = false;

  usuario = new UsuarioModel();


  constructor(private mercadillosService : MercadillosService,
              private route : ActivatedRoute) { 
  }

  ngOnInit(): void {
    //Captura el Id del usuario si viene como parametro en la url
    
    const id= this.route.snapshot.paramMap.get('id');
  
    console.log(id);
    
    if (id !=='nuevo'){  //Voy a modificar un usuario
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

    combineLatest([
      this.mercadillosService.getSexo(),
      this.mercadillosService.getTipoVia()
    ]).subscribe( ([sexo,tipovia]) =>{
      this.tipoSexo = sexo;  
      this.vias = tipovia
    });
    
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
      this.nuevo = false;    
    } else { //NUEVO REGISTRO  
      peticion = this.mercadillosService.crearUsuario(this.usuario); 
      this.nuevo = true;
      //this.usuario  = new UsuarioModel(); // Reinicio los valores
    }

      peticion.subscribe( resp => {       
        Swal.fire({
          title : this.usuario.NIF,
          text : 'Se actualizo correctamente..',
          icon : 'success'
        });

        });
  
      

  }

  LimpiarFormulario(){
    console.log("Dentro de Limpiar Formulario")
    this.usuario = new UsuarioModel();
  }

}