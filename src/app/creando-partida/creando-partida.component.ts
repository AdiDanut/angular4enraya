import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from '../services/socket.service';
import { Router } from '@angular/router';
import { PartidaService } from '../services/partida.service';

@Component({
  selector: 'app-creando-partida',
  templateUrl: './creando-partida.component.html',
  styleUrls: ['./creando-partida.component.css'],
})
export class CreandoPartidaComponent {
  idPartida: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private socket: SocketService,
    private partida: PartidaService
  ) {
    this.idPartida = this.route.snapshot.params['idPartida'];
    this.socket.suscribe(`tablero/${this.idPartida}`, (res: any) => {
      console.log('Mensaje recibido: ' + res);
      this.router.navigate(['/tablero'], {
        queryParams: { idPartida: this.idPartida, jugador: 1 },
      });
    });
  }

  borrarPartida() {
    this.partida.deletePartida(this.idPartida);
    this.socket.unsubscribe();
  }
}
