import { Component, OnInit } from '@angular/core';
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
  options = {
    legend: {position: 'left'}, 
  };
  pieChartColors: string[];
  pieChartDataset: any[];
  constructor(private _statistics: StatisticsService) {};

  ngOnInit() {
    this._statistics.letters.subscribe(res => {
      this.letters = res.sort((a, b) => a.letter > b.letter ? 1 : -1);
      this.pieChartLabels = this.letters.map(letterStats => letterStats.letter);
      this.pieChartData = this.letters.map(letterStats => letterStats.entries);
      this.pieChartColors = this.letters.map(() => this.randomColor())
      this.pieChartDataset = [{data: this.pieChartData, backgroundColor: this.pieChartColors}]
    });
  }
  randomColor() {
    const randomFrom255 = () => Math.trunc(256*Math.random());
    return `rgba(${randomFrom255()}, ${randomFrom255()}, ${randomFrom255()}, 0.5)`;
  }
}
