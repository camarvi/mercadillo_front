import { Component, OnInit } from '@angular/core';
import { MercadillosService } from '../../../services/mercadillos.service';

import { MercadilloInterface } from '../../../interfaces/mercadillos-response';
import { AdjudicadosDetallenterface } from '../../../interfaces/informes-response';

@Component({
  selector: 'app-asignados',
  templateUrl: './asignados.component.html',
  styleUrls: ['./asignados.component.css']
})
export class AsignadosComponent implements OnInit {

  public mercadillos : MercadilloInterface[] = [];
  public asignados : AdjudicadosDetallenterface[] = [];
  public noencontrados : boolean;

  constructor(private mercadillosService : MercadillosService) { }

  ngOnInit(): void {

    this.noencontrados = false;
    this.mercadillosService.getMercadillos()
          .subscribe( (resp : MercadilloInterface[])=>{
            this.mercadillos = resp;
          });
  }

  buscarAsignados(mercadillo : string){

   // console.log(mercadillo);
    this.mercadillosService.getAsignadosMer(mercadillo)
      .subscribe( resp =>{
        this.asignados = resp;
        console.log(this.asignados);
        if (this.asignados.length<1){
          this.noencontrados = true;
        } else {
          this.noencontrados = false;
        }
      });
    
  }

  generarTablaPdf(){
    console.log("Genera Tabla");
  }


}
