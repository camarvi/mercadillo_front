import { Component, OnInit } from '@angular/core';

import { MercadillosService } from '../../../services/mercadillos.service';
import { MercadilloInterface} from '../../../interfaces/mercadillos-response';

@Component({
  selector: 'app-buscarmercadillo',
  templateUrl: './buscarmercadillo.component.html',
  styleUrls: ['./buscarmercadillo.component.css']
})
export class BuscarmercadilloComponent implements OnInit {

  public mercadillos : MercadilloInterface[] = [];

  public cargando : boolean = false;
  

  constructor(private mercadilloService : MercadillosService) { }

  ngOnInit(): void {

   
  }



}
