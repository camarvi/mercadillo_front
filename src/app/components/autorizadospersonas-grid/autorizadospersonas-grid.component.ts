import { Component, OnInit, Input } from '@angular/core';
import { AutorizadosPersonaInterface } from '../../interfaces/informes-response';

@Component({
  selector: 'app-autorizadospersonas-grid',
  templateUrl: './autorizadospersonas-grid.component.html',
  styleUrls: ['./autorizadospersonas-grid.component.css']
})
export class AutorizadospersonasGridComponent implements OnInit {

  @Input() autorizadospers!: AutorizadosPersonaInterface[];

  constructor() { }

  ngOnInit(): void {
  }

}
