import { Component, OnInit } from '@angular/core';
import { single } from './data';
import {LoaderService} from '../loader.service';

@Component({
  selector: 'app-report-generate',
  templateUrl: './report-generate.component.html',
  styleUrls: ['./report-generate.component.css']
})
export class ReportGenerateComponent implements OnInit {
  single: any[];
  multi: any[];

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private loader : LoaderService) {

  }

  onSelect(event) {
    console.log(event);
  }

  ngOnInit(): void {
    this.single = single


  }
}
