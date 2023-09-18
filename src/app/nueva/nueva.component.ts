import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PartidaService } from '../services/partida.service';
import { Jugador } from '../model/jugador';

@Component({
  selector: 'app-nueva',
  templateUrl: './nueva.component.html',
  styleUrls: ['./nueva.component.css']
})
export class NuevaComponent {

  idPartida: number = 0;
  errorMessage: string = '';
  jugador: Jugador;
  constructor(private router: Router, private partidaService: PartidaService) {
    this.jugador = {
      id: "",
      direccion_ip: "",
      jugador1o2: 1,
      turno: true,
      nombre: ""
    }
    
  }

 async crearPartida(){
    if(this.jugador.nombre === ""){
      this.errorMessage = 'Por favor, añade un nombre antes de unirte a la partida.';
    }
    else{
      this.jugador.direccion_ip = await this.partidaService.obtenerIP();
      this.partidaService.crearPartida(this.jugador)
      .then((res: any)  => {
        console.log(res)
        this.idPartida = res.id;
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.router.navigate(['creando-partida/'+ this.idPartida])
      });
    }
  }
}
