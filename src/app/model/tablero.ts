import { Jugador } from "./jugador";

export interface Tablero {
  id: string;
  num_filas: number;
  num_columnas: number;
  matrizTablero: number[][];
  jugador1?: Jugador;
  jugador2?: Jugador;
}
