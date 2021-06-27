import { Component, OnInit, Input } from '@angular/core';
import { DataAlert } from 'src/app/models/alert.model';

@Component({
  selector: 'app-register-alert',
  templateUrl: './register-alert.component.html',
  styleUrls: ['./register-alert.component.css'],
})
export class RegisterAlertComponent implements OnInit {
  ship!: string;
  sensor!: number;
  @Input() time!: Date;
  @Input() allAlerts!: DataAlert[];
  hiddenAlert!: string;
  constructor() {}
  ngOnInit(): void {}
}
