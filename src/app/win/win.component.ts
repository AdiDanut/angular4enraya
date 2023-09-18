import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Jugador } from '../model/jugador';
import { Router } from '@angular/router';

@Component({
  selector: 'app-win',
  templateUrl: './win.component.html',
  styleUrls: ['./win.component.css']
})
export class WinComponent {
  name: string;
  constructor(public bsModalRef: BsModalRef,  private modalService: BsModalService, private router: Router) {
    this.name = ''
  }
  cerrar(){
    this.modalService.hide()
    this.router.navigate([''])
  }
}
