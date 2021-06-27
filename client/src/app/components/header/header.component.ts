import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FetchDataService } from 'src/app/services/fetch-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() statusColor!: number;

  constructor(private fetchData: FetchDataService) {}

  runGame(inputValue: number) {
    this.fetchData.runGame(inputValue).subscribe((data) => {
      console.log({ rungame: data });
    });
  }

  ngOnInit(): void {}
}
