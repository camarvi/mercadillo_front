import { Component, OnInit, Input } from '@angular/core';
import { ParcelaInterface } from '../../interfaces/parcela-response';
import { MercadillosService } from '../../services/mercadillos.service';
import { MercadilloInterface } from '../../interfaces/mercadillos-response';

@Component({
  selector: 'app-parcelas-grid',
  templateUrl: './parcelas-grid.component.html',
  styleUrls: ['./parcelas-grid.component.css']
})
export class ParcelasGridComponent implements OnInit {

  @Input() parcelas!: ParcelaInterface[];
  @Input() mercadillo!: string;
  @Input() codmer !: string;

  public datosMercadillo : MercadilloInterface;


  constructor(private mercadillosService : MercadillosService) { }

  ngOnInit(): void {
      this.mercadillosService.buscarMercadilloId(this.codmer)
          .subscribe( resp => {
            this.datosMercadillo = resp[0];
           // console.log(this.datosMercadillo);
          });
  }

}
