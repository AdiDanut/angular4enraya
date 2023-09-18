import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { Tablero } from '../model/tablero';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { WinComponent } from '../win/win.component';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent implements OnInit {
  bsModalRef!: BsModalRef;

  constructor(private socket: SocketService, private modalService: BsModalService) {}

  ngOnInit(): void {}


}
