import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  public idMovimiento : string;

  constructor(private route : ActivatedRoute) { }

  ngOnInit(): void {
    
    this.idMovimiento = this.route.snapshot.paramMap.get('iddetalle');
    console.log(this.idMovimiento);

  }

}
