import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiaSemana } from '../../../interfaces/diasemana-response';
import { MercadillosService } from '../../../services/mercadillos.service';

@Component({
  selector: 'app-mercadillo',
  templateUrl: './mercadillo.component.html',
  styleUrls: ['./mercadillo.component.css']
})
export class MercadilloComponent implements OnInit {

  listaDias : DiaSemana[] = [];


  constructor(private mercadillosService : MercadillosService,
              private route : ActivatedRoute) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    console.log('Parametro recibido ' + id); 

    this.cargaCombo();
      
  }


  cargaCombo(){

    this.mercadillosService.getDiaSemana()
      .subscribe ( resp => {
        this.listaDias = resp;
      });

  }

}
