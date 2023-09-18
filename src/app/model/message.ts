import { Jugador } from "./jugador";
import { Tablero } from "./tablero";

export interface Message {
    responseNumber: number;
    tablero: Tablero;
    ganador: Jugador;
}
