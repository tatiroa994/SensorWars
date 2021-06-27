import { Component, Input, OnInit } from '@angular/core';
import { FetchDataService } from 'src/app/services/fetch-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() statusColor!: number;

  constructor(private fetchData: FetchDataService) { }


  runGame() {
    this.fetchData.runGame().subscribe((data) => {
      console.log({ rungame: data });
    });
  }

  ngOnInit(): void { }
}
