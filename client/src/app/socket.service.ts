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

  callback: EventEmitter<any> = new EventEmitter();

  constructor() {
    super({
      url: 'http://localhost:3000',
    });

    this.ioSocket.on('data', (data: any) => { this.callback.emit(data); });
  }
}
