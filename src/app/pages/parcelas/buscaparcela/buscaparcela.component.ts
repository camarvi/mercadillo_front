import { Component, OnInit } from '@angular/core';


import { MercadillosService } from '../../../services/mercadillos.service';
import { MercadilloInterface } from '../../../interfaces/mercadillos-response';

@Component({
  selector: 'app-buscaparcela',
  templateUrl: './buscaparcela.component.html',
  styleUrls: ['./buscaparcela.component.css']
})
export class BuscaparcelaComponent implements OnInit {

  public mercadillos : MercadilloInterface[] = [];

  constructor(private mercadillosService : MercadillosService) { }

  ngOnInit(): void {

      this.mercadillosService.getMercadillos()
          .subscribe( (resp : MercadilloInterface[])=>{
            this.mercadillos = resp;
            console.log(this.mercadillos);
          })

  }


buscarParcela(dni : string, name : string){

}

}
