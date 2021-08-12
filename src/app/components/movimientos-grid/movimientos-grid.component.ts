import { Component, OnInit, Input } from '@angular/core';
import { MovimientoDetallenterface } from '../../interfaces/movimiento-response';

@Component({
  selector: 'app-movimientos-grid',
  templateUrl: './movimientos-grid.component.html',
  styleUrls: ['./movimientos-grid.component.css']
})
export class MovimientosGridComponent implements OnInit {

  @Input() movimientos !:  MovimientoDetallenterface[];

  constructor() { }

  ngOnInit(): void {
  }

}
