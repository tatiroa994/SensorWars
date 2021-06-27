import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { EventEmitter } from '@angular/core';

/**
 * On Client <--- Server
 * Emit Client ---> Server
 */
@Injectable({
  providedIn: 'root'
})
export class SocketService extends Socket {

  dataCallback: EventEmitter<any> = new EventEmitter();
  graphCallback: EventEmitter<any> = new EventEmitter();

  constructor() {
    super({
      url: 'http://18.117.255.122:3000',
    });

    this.ioSocket.on('data', (data: any) => { this.dataCallback.emit(data); });
    this.ioSocket.on('graph', (data: any) => { this.graphCallback.emit(data); });
  }
}
