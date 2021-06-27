import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.css'],
})
export class SensorsComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
  // @ViewChild("myChart") ctx!: ElementRef<HTMLCanvasElement>;

  // private chart!: Chart;

  // constructor() {}
  // ngAfterContentInit(): void {
  //   throw new Error('Method not implemented.');
  // }

  // ngAfterViewInit() {
  //   this.chart = new Chart(this.ctx.nativeElement.getContext("2d"), {
  //     // The type of chart we want to create
  //     type: "line",

  //     // The data for our dataset
  //     data: {
  //       labels: [
  //         "January",
  //         "February",
  //         "March",
  //         "April",
  //         "May",
  //         "June",
  //         "July"
  //       ],
  //       datasets: [
  //         {
  //           label: "My First dataset",
  //           backgroundColor: "rgb(255, 99, 132)",
  //           borderColor: "rgb(255, 99, 132)",
  //           data: [0, 10, 5, 2, 20, 30, 45]
  //         }
  //       ]
  //     },

  //     // Configuration options go here
  //     options: {}
  //   });
  // }
}
