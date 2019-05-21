import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { StatisticsService, LetterStats } from '../statistics.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  private letters: LetterStats[];
  pieChartLabels: string[];
  pieChartData: number[];
  pieChartType = 'pie';
  constructor(private _statistics: StatisticsService) { };

  ngOnInit() {
    this._statistics.letters.subscribe(res => {
      this.letters = res.sort((a, b) => a.letter > b.letter ? 1 : -1);
      // debugger;
      this.pieChartLabels = this.letters.map(letterStats => letterStats.letter);
      this.pieChartData = this.letters.map(letterStats => letterStats.entries);
    });
    
  }

}
