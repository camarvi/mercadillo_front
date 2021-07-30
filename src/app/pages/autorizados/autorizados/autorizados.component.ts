import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { MercadillosService } from '../../../services/mercadillos.service';
import { combineLatest } from 'rxjs';

import { AutorizadosInterface } from '../../../interfaces/autorizados-response';
import { UsuarioInterface } from '../../../interfaces/usuario-response';
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

  constructor(private mercadilloService : MercadillosService,
              private route: ActivatedRoute,
              private router : Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    console.log("ANTES DE CombineLatest");
    this.cargando = true;
    combineLatest([
      this.mercadilloService.buscarUsuarioId(id),
      this.mercadilloService.getAutorizados(id)
    ]).subscribe( ([titular,autorizados]) =>{
      if (!titular) {
        this.router.navigateByUrl('/home');
        return;
      }
      
      this.titular = titular;  
      this.autorizados = autorizados;
      console.log("DATOS DEL TITULAR");
      console.log(this.titular);
      console.log("DATOS DE LOS AUTORIZADOS");
      console.log(this.autorizados);
      this.cargando = false;
    });
    
  }

  buscarPersona(dni, ap1) {
    console.log(dni);
    console.log(ap1);

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
