import { Component, OnInit, Input } from '@angular/core';
import { ParcelaInterface } from '../../interfaces/parcela-response';

@Component({
  selector: 'app-parcelaslibres-grid',
  templateUrl: './parcelaslibres-grid.component.html',
  styleUrls: ['./parcelaslibres-grid.component.css']
})
export class ParcelaslibresGridComponent implements OnInit {

  @Input() parcelaslibres!: ParcelaInterface[];
  @Input() nombre_mercadillo !: string;

  constructor() { }


  ngOnInit(): void {
  }

}
