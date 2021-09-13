import { Component, OnInit , Input } from '@angular/core';
import { AdjudicadosDetallenterface } from '../../interfaces/informes-response';

@Component({
  selector: 'app-asignados-grid',
  templateUrl: './asignados-grid.component.html',
  styleUrls: ['./asignados-grid.component.css']
})
export class AsignadosGridComponent implements OnInit {

  @Input() asignados!: AdjudicadosDetallenterface[];
 

  constructor() { }

  ngOnInit(): void {
  }

}
