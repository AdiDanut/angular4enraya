import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PartidaService } from '../services/partida.service';
import { SocketService } from '../services/socket.service';
import { Jugador } from '../model/jugador';

@Component({
  selector: 'app-unirse',
  templateUrl: './unirse.component.html',
  styleUrls: ['./unirse.component.css']
})
export class UnirseComponent {

  idPartida: string = "";

  errorMessage: string = '';

  jugador: Jugador;

  constructor(private router: Router, private partidaService: PartidaService, private socket: SocketService) {
    this.jugador = {
      id: "",
      direccion_ip: "",
      jugador1o2: 2,
      turno: false,
      nombre: ""
    }
  }

  unirsePartida(){
    if(this.jugador.nombre === "" || this.idPartida === ""){
      this.errorMessage = 'Por favor, completa ambos campos antes de unirte a la partida.';
    }
    else{
      this.partidaService.unirsePartida(this.jugador, this.idPartida)
      .then((res: any)  => {
        this.router.navigate(['/tablero'], {
          queryParams: { idPartida: this.idPartida, jugador: 2 }
        });
      })
      .catch(err => {
        console.log(err.status);
        if(err.status === 422){
          this.errorMessage = 'La partida ya esta empezada';
        }else{
          this.errorMessage = 'No existe una partida con ese ID';
        }
      })
    }
    
  }
}
