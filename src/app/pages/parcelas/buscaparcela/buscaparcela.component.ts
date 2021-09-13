import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MercadillosService } from '../../../services/mercadillos.service';
import { MercadilloInterface } from '../../../interfaces/mercadillos-response';
import { ParcelaInterface } from '../../../interfaces/parcela-response';


@Component({
  selector: 'app-buscaparcela',
  templateUrl: './buscaparcela.component.html',
  styleUrls: ['./buscaparcela.component.css']
})
export class BuscaparcelaComponent implements OnInit {

  public mercadillos : MercadilloInterface[] = [];
  public mercadillo : MercadilloInterface;
  public parcela : ParcelaInterface;
  public noDatos : number;

  constructor(private mercadillosService : MercadillosService,
              private router : Router) { }

  ngOnInit(): void {

      this.mercadillosService.getMercadillos()
          .subscribe( (resp : MercadilloInterface[])=>{
            this.mercadillos = resp;
            console.log(this.mercadillos);
          })

       this.noDatos=1;   

  }


buscarParcela(mercadillo : string, parcela : string){

    console.log(mercadillo);
    console.log(parcela);
     this.mercadillosService.buscarMercadilloId(mercadillo)
         .subscribe( resp =>{
           this.mercadillo =resp[0];
           console.log(this.mercadillo); 
           if (this.mercadillo) {
            this.mercadillosService.getParcelaNumMer(this.mercadillo.IDMERCADILLO.toString(),parcela)
              .subscribe ( resp =>{
               // console.log(resp[0]);
               if (resp[0]) {
                this.parcela = resp[0];
                console.log(this.parcela);
                this.router.navigate(['/historico', this.parcela.NUMERO,this.parcela.IDPARCELAS,this.mercadillo.DESCRIPCION]);
           
               } else {
                this.noDatos=0;
               }
                
              });   
             
          }   

         });
     
      
     //  [routerLink]="['/historico', parcela.NUMERO, parcela.IDPARCELAS, mercadillo]"
     //this.router.navigate(['/autorizados', this.datosMovimiento.TITULAR]);
   

}

}
