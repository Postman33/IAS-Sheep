import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {PageEvent} from '@angular/material/paginator';
import {Animal} from '../../../interfaces/animal';

@Component({
  selector: 'app-main-events',
  templateUrl: './main-events.component.html',
  styleUrls: ['./main-events.component.css']
})
export class MainEventsComponent implements OnInit {
  eventTypes = [
    {name: "Бонитировка", type: "appraisal", icon: "login"},
    {name: "Взвешивание", type: "weighting"}
  ];
  public frame = ''
  constructor() { }
  public animals : Animal[]= [];
  ngOnInit(): void {
  }

  displayedColumns: string[] = ['1', '2', '3'];
  dataSource = new MatTableDataSource(this.animals);

  applyFilter(value: any) {
    this.dataSource.filter = value.toLowerCase().trim();
  }



  refreshData() {
    this.dataSource = new MatTableDataSource(this.animals);
    //this.dataSource.paginator = this.paginator;
  }

}
