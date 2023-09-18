import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jugador } from '../model/jugador';
import { Movimiento } from '../model/movimiento';
import { Tablero } from '../model/tablero';
import { Jugada } from '../model/jugada';
import { Historial } from '../model/historial';

@Injectable({
  providedIn: 'root',
})
export class PartidaService {
  apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  generarCombinacion(longitud: number): string {
    const caracteres =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let combinacion = '';
    for (let i = 0; i < longitud; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      combinacion += caracteres.charAt(indice);
    }
    return combinacion;
  }

  async obtenerIP(): Promise<string> {
    try {
      const response = await this.http
        .get<any>('https://api.ipify.org/?format=json')
        .toPromise();
      return response.ip;
    } catch (error) {
      throw error;
    }
  }

  async crearPartida(jugador: Jugador) {
    const urlBackend = `${this.apiUrl}/crearPartida`;
    return this.http.post<any>(urlBackend, jugador).toPromise();
  }

  async unirsePartida(jugador: Jugador, idTablero: string) {
    const urlBackend = `${this.apiUrl}/addJugador/${idTablero}`;
    return this.http.post<any>(urlBackend, jugador).toPromise();
  }

  async realizarMovimiento(movimiento: Movimiento) {
    const urlBackend = `${this.apiUrl}/realizarMovimiento`;
    return this.http.put<any>(urlBackend, movimiento).toPromise();
  }

  async getGamesActive(): Promise<Array<Tablero>> {
    const urlBackend = `${this.apiUrl}/getAllGames`;
    return this.http.get<any>(urlBackend).toPromise();
  }

  async deletePartida(idPartida: string) {
    return this.http.delete(`${this.apiUrl}/${idPartida}`).toPromise();
  }

  async crearJugada(jugada: Jugada) {
    return this.http
      .post<any>(`${this.apiUrl}/crearJugada`, jugada)
      .toPromise();
  }

  async guardarHistorial(historial: Historial) {
    return this.http
      .post<any>(`${this.apiUrl}/historial/guardar`, historial)
      .toPromise();
  }

  async getHistorial(ipJugador: string) {
    return this.http
      .get<Array<Historial>>(`${this.apiUrl}/historial/${ipJugador}`)
      .toPromise();
  }
}
