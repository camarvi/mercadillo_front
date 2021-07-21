import { Component, OnInit, Input } from '@angular/core';
import { ParcelaInterface } from '../../interfaces/parcela-response';

@Component({
  selector: 'app-parcelas-grid',
  templateUrl: './parcelas-grid.component.html',
  styleUrls: ['./parcelas-grid.component.css']
})
export class ParcelasGridComponent implements OnInit {

  @Input() parcelas!: ParcelaInterface[];

  constructor() { }

  ngOnInit(): void {
  }

}
