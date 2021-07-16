import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listadoparcelas',
  templateUrl: './listadoparcelas.component.html',
  styleUrls: ['./listadoparcelas.component.css']
})
export class ListadoparcelasComponent implements OnInit {

  constructor(private route : ActivatedRoute) { }

  ngOnInit(): void {
    //Obtener el Id del mercadillo
    const id= this.route.snapshot.paramMap.get('id');

    console.log("Id recibido" + id);

  }

}
