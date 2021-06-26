import { Component, OnInit, Input } from '@angular/core';
import { Alert, DataAlert } from 'src/app/models/alert.model';
import { FetchDataService } from 'src/app/services/fetch-data.service';

@Component({
  selector: 'app-register-alert',
  templateUrl: './register-alert.component.html',
  styleUrls: ['./register-alert.component.css'],
})
export class RegisterAlertComponent implements OnInit {
  ship!: string;
  sensor!: number;
  time!: Date;
  allAlerts!: DataAlert[];
  constructor(private fetchData: FetchDataService) {
    this.allAlerts = [];
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.fetchData.getData().subscribe((data) => {
      console.log(data.sensonrs);
      
      const dataSensors: DataAlert[] = data.sensors;
      dataSensors.forEach((element) => {
        if (element.alert.type === 2 && element.proximity.type === 'danger') {
          this.allAlerts.push(element)
        }
      });
      console.log(this.allAlerts);
      
    });
  }
}
