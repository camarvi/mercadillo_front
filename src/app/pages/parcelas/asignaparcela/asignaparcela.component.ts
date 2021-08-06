import { Component, OnInit } from '@angular/core';

import { UsuarioModel } from '../../../models/usuario.model';

@Component({
  selector: 'app-asignaparcela',
  templateUrl: './asignaparcela.component.html',
  styleUrls: ['./asignaparcela.component.css']
})
export class AsignaparcelaComponent implements OnInit {

  public buscarPersonas= new UsuarioModel();

  constructor() { }

  ngOnInit(): void {
  }

}
