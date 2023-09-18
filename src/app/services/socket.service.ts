import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import { Tablero } from '../model/tablero';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket: any;

  stompClient: any;

  currentSubscription: any;


  constructor() {
   }

  suscribe(topic?: string, callback?: any) {
    this.socket = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(this.socket)
    this.stompClient.connect({}, () => {
      this.currentSubscription = this.suscribeToTopic(topic, callback);
      return this.currentSubscription;
  
    });
  
   }
  
   
  
   suscribeToTopic(topic?: string, callback?: any) {
    if(topic == undefined){
      topic = "";
    }
    this.stompClient.subscribe("/topic/"+topic, (message: any): any => {
      const messageBody = (message.body); // Assuming the message is JSON
      callback(messageBody);
  
    })
   }

   unsubscribe() {
    if (this.currentSubscription) {
      this.currentSubscription.unsubscribe();
      this.currentSubscription = null;
    }
  }
  
   
}
