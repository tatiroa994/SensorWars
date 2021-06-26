import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-notification-alert',
  templateUrl: './notification-alert.component.html',
  styleUrls: ['./notification-alert.component.css']
})
export class NotificationAlertComponent implements OnInit {
@Input() classNotification!: string
@Input() classImg!: string
  constructor() { }

  ngOnInit(): void {
  }

}
