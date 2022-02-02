import { Component, OnInit, Input } from '@angular/core';
import { MoviPersonasInterface } from '../../interfaces/movimiento-response';

@Component({
  selector: 'app-movpersonas-grid',
  templateUrl: './movpersonas-grid.component.html',
  styleUrls: ['./movpersonas-grid.component.css']
})
export class MovpersonasGridComponent implements OnInit {

  @Input() movimientos !:  MoviPersonasInterface[];
 
  
  constructor() { }

  ngOnInit(): void {
  }

}
