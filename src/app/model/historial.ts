import { Jugador } from "./jugador";

export interface Historial {
    id: string;
    jugador1: Jugador;
    jugador2: Jugador;
    ganador: number;
    idTablero: string;
    fecha: Date;
}
