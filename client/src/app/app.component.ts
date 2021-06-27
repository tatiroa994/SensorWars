import { Component, OnInit } from '@angular/core';
import { DataAlert } from './models/alert.model';
import { FetchDataService } from './services/fetch-data.service';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  allAlerts!: DataAlert[];
  time!: Date;
  lengthAlert!: number;

  constructor(private fetchData: FetchDataService, private socket: SocketService) {
    this.allAlerts = [];
  }

  ngOnInit(): void {
    this.socket.callback.subscribe((data) => {
      this.allAlerts = data.sensors;
      this.time = data.timestamp;
      this.lengthAlert = this.allAlerts.length;
    });

    // let count = 12;
    // const interval = setInterval(() => {
    // this.getData();
    //   count--;
    //   if (count <= 0) {
    //     clearInterval(interval);
    //   }
    // }, 5000);
  }

  getData() {
    this.fetchData.getData().subscribe((data) => {
      console.log(data);
      this.allAlerts = data.data.sensors;
      this.time = data.data.timestamp;
      this.lengthAlert = this.allAlerts.length;
    });
  }
}
