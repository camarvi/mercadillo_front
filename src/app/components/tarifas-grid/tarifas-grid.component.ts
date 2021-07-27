import { Component, OnInit, Input } from '@angular/core';

import { TarifaInterface } from '../../interfaces/tarifa-response';


@Component({
  selector: 'app-tarifas-grid',
  templateUrl: './tarifas-grid.component.html',
  styleUrls: ['./tarifas-grid.component.css']
})
export class TarifasGridComponent implements OnInit {

  @Input() tarifas !:  TarifaInterface[];
 

  constructor() { }

  ngOnInit(): void {

  }

}
