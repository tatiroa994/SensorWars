import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartALert, DataAlert } from './models/alert.model';
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
  allGraphs!: ChartALert[];
  chart!: Chart;
  countLabels!: number;

  constructor(
    private fetchData: FetchDataService /* , private socket: SocketService */
  ) {
    this.allAlerts = [];
    this.allGraphs = [];
    this.countLabels = 0;
  }

  ngOnInit(): void {
    // this.socket.callback.subscribe((data) => {
    //   if (data) {
    //     this.allAlerts = data.sensors;
    //     this.time = data.timestamp;
    //     this.lengthAlert = this.allAlerts.length;
    //   }
    // });

    let count = 12;
    const interval = setInterval(() => {
      this.getData();
      count--;
      if (count <= 0) {
        clearInterval(interval);
      }
    }, 5000);
  }

  getData() {
    this.fetchData.getData().subscribe((data) => {
      console.log(data);
      this.allAlerts = data.data.sensors;
      this.time = data.data.timestamp;
      this.lengthAlert = this.allAlerts.length;
      this.addData(data.data.graph);
    });
  }

  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart: any;

  addData(graph: ChartALert) {
    this.chart.data.labels?.push(this.countLabels++);
    this.chart.data.datasets?.forEach((dataset) => {
      dataset.data?.push(graph.dangerCount);
    });
    this.chart.update();
  }

  ngAfterViewInit() {
    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    this.chart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Alertas',
            data: [],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
          },
        ],
      },
    });
  }
}
