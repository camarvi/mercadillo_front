import { Component, OnInit, Input } from '@angular/core';

import { PersonaInterface } from '../../interfaces/mercadillos-response';

@Component({
  selector: 'app-usuarios-grid',
  templateUrl: './usuarios-grid.component.html',
  styleUrls: ['./usuarios-grid.component.css']
})
export class UsuariosGridComponent implements OnInit {

  @Input() personas!: PersonaInterface[];

  cargando : boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.cargando = true;

    console.log(this.personas);
  }

}
