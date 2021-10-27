import { Component, OnInit } from '@angular/core';
import { MercadilloInterface } from '../../../interfaces/mercadillos-response';
import { ParcelaInterface } from '../../../interfaces/parcela-response';
import { MercadillosService} from '../../../services/mercadillos.service';

@Component({
  selector: 'app-vacantes',
  templateUrl: './vacantes.component.html',
  styleUrls: ['./vacantes.component.css']
})
export class VacantesComponent implements OnInit {

  public mercadillos : MercadilloInterface[] = [];
  public parcelaslibres : ParcelaInterface[] = [];
  public noencontrados : boolean;

  constructor(private mercadilloService : MercadillosService) { }

  ngOnInit(): void {
    this.noencontrados = false;
    this.mercadilloService.getMercadillos()
        .subscribe( (resp : MercadilloInterface[])   => {
            this.mercadillos = resp;
        });
  }

  buscarVacantes(mercadillo : string){
    this.mercadilloService.getParcelasLibres(mercadillo)
        .subscribe( resp=>{
          console.log(resp);
          this.parcelaslibres = resp;
          console.log(this.parcelaslibres);
          if (this.parcelaslibres.length<1){
            this.noencontrados = true;
          }

        });

  }

}
