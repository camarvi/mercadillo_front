import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MercadillosService } from '../../../services/mercadillos.service';
import { AutorizadosInterface } from '../../../interfaces/autorizados-response';
import { UsuarioInterface } from '../../../interfaces/usuario-response';

import { AutorizadosModel } from '../../../models/autorizados.model';
import { ParentescoInterface } from '../../../interfaces/mercadillos-response';
import { UsuarioModel } from  '../../../models/usuario.model';

import Swal from 'sweetalert2';



@Component({
  selector: 'app-autorizados',
  templateUrl: './autorizados.component.html',
  styleUrls: ['./autorizados.component.css']
})

export class AutorizadosComponent implements OnInit {

  public cargando : boolean = false;
  public titular : UsuarioInterface ;  
  public autorizados : AutorizadosInterface[] = [];
  public nuevoAutorizado = new AutorizadosModel();
  public buscarPersonas= new UsuarioModel();
  public id : string;


  tipoParentesco : ParentescoInterface[] = [];

  constructor(private mercadilloService : MercadillosService,
              private route: ActivatedRoute,
              private router : Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    //console.log("ANTES DE CombineLatest");
    this.cargando = true;
    combineLatest([
      this.mercadilloService.buscarUsuarioId(this.id),
      this.mercadilloService.getAutorizados(this.id),
      this.mercadilloService.getParentesco()
    ]).subscribe( ([titular,autorizados,parentescos]) =>{
      if (!titular) {
        this.router.navigateByUrl('/home');
        return;
      }
      
      this.titular = titular;  
      this.autorizados = autorizados;
      this.tipoParentesco = parentescos;
      this.nuevoAutorizado.AUTORIZADO = Number(this.id);
      this.cargando = false;
    });
    
  }

  buscarNuevoAutorizado(){  //(termino : string){
  
    this.mercadilloService.buscarUsuarioNif(this.buscarPersonas.NIF)
        .subscribe( (resp: UsuarioModel) => {
          this.buscarPersonas = resp[0];
          console.log(resp)   
        });
  }

  limpiarPantalla(){
    this.buscarPersonas = new UsuarioModel();
  }

  guardar(){

    if (this.nuevoAutorizado.PARENTESCO>0) {
      this.nuevoAutorizado.TITULAR = Number(this.id); 
      this.nuevoAutorizado.AUTORIZADO = this.buscarPersonas.IDPERSONA;
      console.log(this.nuevoAutorizado);
      this.mercadilloService.newAutorizado(this.nuevoAutorizado)
          .subscribe( resp =>{
            this.nuevoAutorizado.ID_AUTORIZADO = resp[0];

            Swal.fire({
              title : "ALTA",
              text : 'Registro añadido correctamente..',
              icon : 'success'
            });


          }); 
        this.mercadilloService.getAutorizados(this.id)
            .subscribe( resp => {
              this.autorizados = resp;
            });
       this.buscarPersonas = new UsuarioModel();     
       this.ngOnInit();  
          
    }
    
  }


  eliminar(id: string){
  
    this.mercadilloService.deleteAutorizado(id)
      .subscribe( resp => {
        console.log(resp);
        Swal.fire({
          title : "Eliminar",
          text : 'Registro eliminado correctamente..',
          icon : 'success'
        });
      });
  }


  procesaPropagar(codigo : string) {
     this.eliminar(codigo);
     
   }


}
