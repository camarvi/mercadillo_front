import { Component, OnInit, Input } from '@angular/core';
import { MercadilloInterface } from '../../interfaces/mercadillos-response';

@Component({
  selector: 'app-mercadillos-grid',
  templateUrl: './mercadillos-grid.component.html',
  styleUrls: ['./mercadillos-grid.component.css']
})
export class MercadillosGridComponent implements OnInit {

  @Input() mercadillos!: MercadilloInterface[];

  constructor() { }

  ngOnInit(): void {
  }

}
