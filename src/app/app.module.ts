import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './principal/principal.component';
import { NuevaComponent } from './nueva/nueva.component';
import { HttpClientModule } from '@angular/common/http';
import { CreandoPartidaComponent } from './creando-partida/creando-partida.component';
import { FormsModule } from '@angular/forms';
import { UnirseComponent } from './unirse/unirse.component';
import { TableroComponent } from './tablero/tablero.component';
import { PartidasEmpezadasComponent } from './partidas-empezadas/partidas-empezadas.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WinComponent } from './win/win.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HistorialComponent } from './historial/historial.component';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    NuevaComponent,
    CreandoPartidaComponent,
    UnirseComponent,
    TableroComponent,
    PartidasEmpezadasComponent,
    WinComponent,
    HistorialComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxSpinnerModule ,
    NgxSpinnerModule.forRoot({ type: 'pacman' }),
    BrowserAnimationsModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
