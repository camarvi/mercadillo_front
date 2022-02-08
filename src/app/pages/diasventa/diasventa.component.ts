import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { MercadillosService } from '../../services/mercadillos.service';

import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { MovimientoDetallenterface } from '../../interfaces/movimiento-response';
import { ParcelaInterface } from '../../interfaces/parcela-response';
import { DiasVentaUsuarioInterface } from '../../interfaces/diasventausuario-response';
import { DiasVentaUsuarioModel } from '../../models/diasventausuario.model';

@Component({
  selector: 'app-diasventa',
  templateUrl: './diasventa.component.html',
  styleUrls: ['./diasventa.component.css'],
})
export class DiasventaComponent implements OnInit {
  public idMovimiento: string;
  public idParcela: string;
  public nombreMercadillo: string;
  public datosMovimiento: MovimientoDetallenterface;
  public datosParcela: ParcelaInterface;
  //misDiasVenta : DiasVentaUsuarioInterface;
  misDiasVenta = new DiasVentaUsuarioModel();
  almacenaDiasVenta = new DiasVentaUsuarioModel();
  public muestroDias: boolean = false;

  constructor(
    private mercadillosServices: MercadillosService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idMovimiento = this.route.snapshot.paramMap.get('mov');
    //mercadillo
    this.idParcela = this.route.snapshot.paramMap.get('parcela');
    this.nombreMercadillo = this.route.snapshot.paramMap.get('mercadillo');

    console.log('ID MOVIMIENTO ' + this.idMovimiento);
    console.log('IDPARCELA ' + this.idParcela);
    console.log('NombreMercadillo ' + this.nombreMercadillo);

    this.mercadillosServices
      .getDiasVentaUsuario(this.route.snapshot.paramMap.get('mov'))
      .subscribe((resp: DiasVentaUsuarioInterface) => {
        console.log(resp[0]);
        if (typeof resp[0] === 'undefined') {
          console.log('SIN DATOS');
          this.misDiasVenta.IDMOV = Number(this.route.snapshot.paramMap.get('mov'));
          console.log('MisDiasVenta ' + this.misDiasVenta.IDVENTA);
          console.log('MisDiasVentaIDMOV ' + this.misDiasVenta.IDMOV);
        } else {
          this.misDiasVenta = resp[0];
          console.log('MisDiasVenta ' + this.misDiasVenta.IDVENTA);
          this.mostrarDiasFormulario();
        }
      });

    combineLatest([
      this.mercadillosServices.getMovimiento(this.idMovimiento),
      this.mercadillosServices.getParcelaId(this.idParcela),
      // ,
      // this.mercadillosServices.getDiasVentaUsuario(this.idMovimiento),
    ]).subscribe(([datosMovimiento, datosParcela]) => {
      //,datosDiasVentas]) => {
      this.datosMovimiento = datosMovimiento[0];
      this.datosParcela = datosParcela[0];
    });
  }

  mostrarDiasFormulario() {
    if (this.misDiasVenta.DOM === 'N') {
      this.misDiasVenta.DOM = false;
    } else {
      this.misDiasVenta.DOM = true;
    }

    if (this.misDiasVenta.LUN === 'N') {
      this.misDiasVenta.LUN = false;
    } else {
      this.misDiasVenta.LUN = true;
    }

    if (this.misDiasVenta.MAR === 'N') {
      this.misDiasVenta.MAR = false;
    } else {
      this.misDiasVenta.MAR = true;
    }

    if (this.misDiasVenta.MIE === 'N') {
      this.misDiasVenta.MIE = false;
    } else {
      this.misDiasVenta.MIE = true;
    }

    if (this.misDiasVenta.JUE === 'N') {
      this.misDiasVenta.JUE = false;
    } else {
      this.misDiasVenta.JUE = true;
    }

    if (this.misDiasVenta.VIE === 'N') {
      this.misDiasVenta.VIE = false;
    } else {
      this.misDiasVenta.VIE = true;
    }

    if (this.misDiasVenta.SAB === 'N') {
      this.misDiasVenta.SAB = false;
    } else {
      this.misDiasVenta.SAB = true;
    }

    console.log('mostrarDiasForm ' + this.misDiasVenta.SAB);
  }

  almacenarDiasFormulario() {
    this.almacenaDiasVenta.IDMOV = this.misDiasVenta.IDMOV;
    this.almacenaDiasVenta.IDVENTA = this.misDiasVenta.IDVENTA;

    if (this.misDiasVenta.DOM == false) {
      this.almacenaDiasVenta.DOM = 'N';
    } else {
      this.almacenaDiasVenta.DOM = 'S';
    }

    if (this.misDiasVenta.LUN == false) {
      this.almacenaDiasVenta.LUN = 'N';
    } else {
      this.almacenaDiasVenta.LUN = 'S';
    }

    if (this.misDiasVenta.MAR == false) {
      this.almacenaDiasVenta.MAR = 'N';
    } else {
      this.almacenaDiasVenta.MAR = 'S';
    }

    if (this.misDiasVenta.MIE == false) {
      this.almacenaDiasVenta.MIE = 'N';
    } else {
      this.almacenaDiasVenta.MIE = 'S';
    }

    if (this.misDiasVenta.JUE == false) {
      this.almacenaDiasVenta.JUE = 'N';
    } else {
      this.almacenaDiasVenta.JUE = 'S';
    }

    if (this.misDiasVenta.VIE == false) {
      this.almacenaDiasVenta.VIE = 'N';
    } else {
      this.almacenaDiasVenta.VIE = 'S';
    }

    if (this.misDiasVenta.SAB == false) {
      this.almacenaDiasVenta.SAB = 'N';
    } else {
      this.almacenaDiasVenta.SAB = 'S';
    }
  }

  guardar(forma: NgForm) {
    if (forma.invalid) {
      // recorrer los elementos del formulario para que se dispare las validaciones
      Object.values(forma.controls).forEach((control) => {
        control.markAsTouched(); //Lo pongo como pulsado
      });
      return;
    }

    let peticion: Observable<any>;

    this.almacenarDiasFormulario();
    //console.log("this.almacenaDiasVenta " + this.almacenaDiasVenta.IDVENTA);

    if (this.almacenaDiasVenta.IDVENTA) {
      // MODIFICACION
      console.log('MODIFICAR DIASVENTA');
      peticion = this.mercadillosServices.updateDiasVentaUsuario(
        this.almacenaDiasVenta
      );
    } else {
      // NUEVA ALTA
      console.log('NUEVO REGISTRO');
      peticion = this.mercadillosServices.newDiasVentaUsuario(
        this.almacenaDiasVenta
      );
    }

    peticion.subscribe((resp: DiasVentaUsuarioModel) => {
      Swal.fire({
        title: 'Dias Venta',
        text: 'Se almaceno correctamente..',
        icon: 'success',
      });
    });
  }
}
