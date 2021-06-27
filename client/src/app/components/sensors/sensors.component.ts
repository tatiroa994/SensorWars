import { Input, SimpleChanges } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Subject } from 'rxjs';
import { ChartALert } from 'src/app/models/alert.model';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.css'],
})
export class SensorsComponent implements OnInit {
  @Input() allGraphs!: ChartALert[];
  chart!: Chart;

  constructor() {}
  ngOnInit(): void {}

  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart: any;

  // ngOnChanges(changes: SimpleChanges) {
  //   if (!changes['allGraphs'].isFirstChange()) {
  //     console.log("if");
      
  //     this.chart.data.labels?.push(this.allGraphs.length + 1);
  //     this.chart.data.datasets?.forEach((dataset, index) => {
  //       dataset.data?.push(this.allGraphs[this.allGraphs.length-1].graph.dangerCount);
  //     });
  //     this.chart.update();
  //   }
  //   console.log("fuera if");
    
  // }

  // ngAfterViewInit() {
  //   this.canvas = this.mychart.nativeElement;
  //   this.ctx = this.canvas.getContext('2d');

  //   this.chart = new Chart(this.ctx, {
  //     type: 'line',
  //     data: {
  //       labels: [],
  //       datasets: [
  //         {
  //           label: 'Alertas',
  //           data: [],
  //           fill: false,
  //           borderColor: 'rgb(75, 192, 192)',
  //         },
  //       ],
  //     },
  //   });
  // }
}
