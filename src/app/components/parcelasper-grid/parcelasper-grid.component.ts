import { Component, OnInit , Input } from '@angular/core';

import { PersonasPuestoInterface } from '../../interfaces/informes-response';

@Component({
  selector: 'app-parcelasper-grid',
  templateUrl: './parcelasper-grid.component.html',
  styleUrls: ['./parcelasper-grid.component.css']
})
export class ParcelasperGridComponent implements OnInit {

  @Input() personaspar!: PersonasPuestoInterface[];

  constructor() { }

  ngOnInit(): void {
  }

}
