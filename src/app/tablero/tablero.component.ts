import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from '../services/socket.service';
import { PartidaService } from '../services/partida.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Tablero } from '../model/tablero';
import { Movimiento } from '../model/movimiento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { WinComponent } from '../win/win.component';
import { Jugador } from '../model/jugador';
import { Message } from '../model/message';
import { Jugada } from '../model/jugada';
import { Historial } from '../model/historial';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css'],
})
export class TableroComponent implements OnInit {
  fila!: number;
  columna!: number;
  bsModalRef!: BsModalRef;

  id: string = '';
  jugador: number = 0;
  tablero!: Tablero;
  movimiento: Movimiento;
  responseNumber: number = 0;
  jugada!: Jugada;
  historial!: Historial;
  ganador: number = 0;

  constructor(
    private route: ActivatedRoute,
    private socket: SocketService,
    private partidaService: PartidaService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService
  ) {
    this.route.queryParams.subscribe((params) => {
      const idParam = params['idPartida'];
      this.jugador = params['jugador'];
      if (idParam) {
        this.id = idParam;
      }
    });
    if (this.jugador == 2) {
      console.log('Entra');
      this.spinner.show();
    }
    this.movimiento = {
      columna: 0,
      idTablero: '',
      jugador: 0,
    };
  }

  tableroAntiguo!: number[][];
  tableroNuevo!: number[][];

  ngOnInit() {
    this.socket.suscribe(
      `game-progress/${this.id}/${this.jugador}`,
      (res: any) => {
        console.log('Mensaje recibido: ' + res);
        var tempMess = JSON.parse(res) as Message;
        console.log(tempMess);

        if (tempMess.responseNumber == 201) {
          console.log(tempMess);

          this.openModal(tempMess.ganador.nombre);
          this.spinner.hide();
          this.ganador = tempMess.ganador.jugador1o2;
          return;
        }
        if (tempMess.responseNumber == 204) {
          this.openModal('');
          this.spinner.hide();
          return;
        }
        this.spinner.hide();
        if (this.tablero == undefined) {
          this.tableroAntiguo = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
          ];
        } else {
          this.tableroAntiguo = this.tablero.matrizTablero;
        }
        this.tablero = JSON.parse(res) as Tablero;

        this.tableroNuevo = this.tablero.matrizTablero;

        for (let i = 0; i < this.tableroAntiguo.length; i++) {
          for (let j = 0; j < this.tableroAntiguo[0].length; j++) {
            if (
              this.tableroAntiguo[i][j] === 1 ||
              this.tableroAntiguo[i][j] === 2
            ) {
              this.tableroAntiguo[i][j] = 0;
            } else if (this.tableroAntiguo[i][j] === 0) {
              this.tableroAntiguo[i][j] = this.tableroNuevo[i][j];
            }
          }
        }

        var columns = document.querySelectorAll('.column');

        this.tableroAntiguo.forEach((fila, filaIndex) => {
          fila.forEach((columna, columnaIndex) => {
            if (columna == 1) {
              const disc = document.createElement('div');
              disc.classList.add('disc', 'red');
              columns[columnaIndex].appendChild(disc);
            }
            if (columna == 2) {
              const disc = document.createElement('div');
              disc.classList.add('disc', 'yellow');
              columns[columnaIndex].appendChild(disc);
            }
          });
        });
      }
    );
  }
  openModal(nombre: string) {
    this.bsModalRef = this.modalService.show(WinComponent, {
      initialState: {
        name: nombre,
      },
    });
  }

  oneClick = 0;

  onColumnClick(column: HTMLElement) {
    this.spinner.hide();

    this.oneClick++;
    var divs = column.querySelectorAll('div');
    var count = divs.length;

    if (this.jugador == 2) {
      const disc = document.createElement('div');
      disc.classList.add('disc', 'yellow');
      column.appendChild(disc);
    } else {
      const disc = document.createElement('div');
      disc.classList.add('disc', 'red');
      column.appendChild(disc);
    }
    this.movimiento.idTablero = this.id;
    this.movimiento.columna = Number(column.id);
    this.movimiento.jugador = this.jugador;

    this.partidaService
      .realizarMovimiento(this.movimiento)
      .then((res: any) => {
        this.spinner.show();
        this.tablero = res.tablero;
        this.responseNumber = res.responseNumber;
        this.jugada = {
          idJugada: "",
          idTablero: res.tablero.id,
          matrizTablero: res.tablero.matrizTablero
        }
        this.partidaService.crearJugada(this.jugada);
        console.log(res.tablero);
        if (this.responseNumber == 201) {
          this.spinner.hide();
          this.historial = {
            id: "",
            jugador1: res.tablero.jugador1,
            jugador2: res.tablero.jugador2,
            fecha: new Date(),
            ganador: this.ganador,
            idTablero: res.tablero.id
          }
          this.partidaService.guardarHistorial(this.historial);
        }
        if (this.responseNumber == 204) {
          this.spinner.hide();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
