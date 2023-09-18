import { Component, OnInit } from '@angular/core';
import { PartidaService } from '../services/partida.service';
import { Tablero } from '../model/tablero';
import { Jugador } from '../model/jugador';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partidas-empezadas',
  templateUrl: './partidas-empezadas.component.html',
  styleUrls: ['./partidas-empezadas.component.css'],
})
export class PartidasEmpezadasComponent implements OnInit {
  partidas: Array<Tablero> = [];
  jugador: Jugador;

  constructor(private partidaService: PartidaService, private router: Router) {
    this.jugador = {
      id: '',
      direccion_ip: '',
      jugador1o2: 2,
      nombre: '',
      turno: false,
    };
  }

  ngOnInit() {
    this.getPartidas();
    this.obtenerIp();
  }

  async getPartidas() {
    this.partidas = await this.partidaService.getGamesActive();
  }

  unirsePartida(idPartida: string) {
    this.partidaService
      .unirsePartida(this.jugador, idPartida)
      .then((res: any) => {
        this.router.navigate(['/tablero'], {
          queryParams: { idPartida: idPartida, jugador: 2 },
        });
      });
  }

  async obtenerIp(){
    this.jugador.direccion_ip = await this.partidaService.obtenerIP();
  }
}
