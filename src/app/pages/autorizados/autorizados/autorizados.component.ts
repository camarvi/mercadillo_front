import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MercadillosService } from '../../../services/mercadillos.service';
import { AutorizadosInterface } from '../../../interfaces/autorizados-response';
import { UsuarioInterface } from '../../../interfaces/usuario-response';

import { AutorizadosModel } from '../../../models/autorizados.model';
import { ParentescoInterface } from '../../../interfaces/mercadillos-response';


import Swal from 'sweetalert2';
import { UsuarioModel } from 'src/app/models/usuario.model';


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
  tipoParentesco : ParentescoInterface[] = [];

  constructor(private mercadilloService : MercadillosService,
              private route: ActivatedRoute,
              private router : Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    //console.log("ANTES DE CombineLatest");
    this.cargando = true;
    combineLatest([
      this.mercadilloService.buscarUsuarioId(id),
      this.mercadilloService.getAutorizados(id),
      this.mercadilloService.getParentesco()
    ]).subscribe( ([titular,autorizados,parentescos]) =>{
      if (!titular) {
        this.router.navigateByUrl('/home');
        return;
      }
      
      this.titular = titular;  
      this.autorizados = autorizados;
      this.tipoParentesco = parentescos;
      //console.log("DATOS DEL TITULAR");
      //console.log(this.titular);
      //console.log("DATOS DE LOS AUTORIZADOS");
      //console.log(this.autorizados);
      this.nuevoAutorizado.AUTORIZADO = Number(id);
      this.cargando = false;
    });
    
  }

  buscarPersona(dni, ap1) {
    console.log(dni);
    console.log(ap1);

  }


  buscarPokemon(termino : string){
   // this.router.navigate(['/buscar', termino]);
   console.log("Dentro de BuscarPokemon");
    console.log(termino);
    console.log("BUSCAR POR DNI");
    this.mercadilloService.buscarUsuarioNif(termino)
        .subscribe( (resp: UsuarioModel) => {
          console.log(resp)
        //  this.nuevoAutorizado.APE1 = resp.APE1;
         // this.nuevoAutorizado.APE2 = resp.APE2;
         // this.nuevoAutorizado.AUTORIZADO = resp.IDPERSONA;
        //  console.log(this.nuevoAutorizado);
        })
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


  
  procesaPropagar(id : string) {
     this.eliminar(id);
     
   }

}
