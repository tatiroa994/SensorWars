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
  chartDanger!: Chart;
  chartInactive!: Chart;
  canvas: any;
  ctx: any;
  countLabels!: number;
  @ViewChild('mychartDanger') mychartDanger: any;
  @ViewChild('mychartInactive') mychartInactive: any;

  constructor(
    // private fetchData: FetchDataService,
    private socket: SocketService
  ) {
    this.allAlerts = [];
    this.allGraphs = [];
    this.countLabels = 1;
  }

  ngOnInit(): void {
    this.socket.dataCallback.subscribe((data) => {
      if (data) {
        this.allAlerts = data.sensors;
        this.time = data.timestamp;
        this.lengthAlert = this.allAlerts.length;
      }
    });

    this.socket.graphCallback.subscribe((graph) => {
      if (graph) {
        this.addData(graph);
      }
    });

    // let count = 12;
    // const interval = setInterval(() => {
    //   this.getData();
    //   count--;
    //   if (count <= 0) {
    //     clearInterval(interval);
    //   }
    // }, 5000);
  }

  // getData() {
  //   this.fetchData.getData().subscribe((data) => {
  //     console.log(data);
  //     this.allAlerts = data.data.sensors;
  //     this.time = data.data.timestamp;
  //     this.lengthAlert = this.allAlerts.length;
  //     this.addData(data.data.graph);
  //   });
  // }

  addData(graph: ChartALert) {
    this.chartDanger.data.labels?.push(this.countLabels++);
    this.chartDanger.data.datasets?.forEach((dataset) => {
      dataset.data?.push(graph.dangerCount);
    });
    this.chartDanger.update();

    this.chartInactive.data.labels?.push(this.countLabels++);
    this.chartInactive.data.datasets?.forEach((dataset) => {
      dataset.data?.push(graph.inactiveCount);
    });
    this.chartInactive.update();
  }

  ngAfterViewInit() {
    this.canvas = this.mychartDanger.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    this.chartDanger = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: [0],
        datasets: [
          {
            label: 'Alertas',
            data: [0],
            fill: false,
            borderColor: 'rgb(255, 0, 0)',
          },
        ],
      },
    });

    this.canvas = this.mychartInactive.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    this.chartInactive = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: [0],
        datasets: [
          {
            label: 'Fallós',
            data: [0],
            fill: false,
            borderColor: 'rgb(255, 255, 51)',
          },
        ],
      },
    });
  }
}
