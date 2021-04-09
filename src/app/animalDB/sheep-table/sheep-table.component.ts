import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Chaban} from '../../journalDB/chanban-table/chanban-table.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface AnimalElement {
  RegisterNo? : Number;
  chaban? : Chaban; // Чабан
  Birthday? : Date | string;
  Purpose? : string; // Назначение
}
const Animals_DATA : AnimalElement[] = [
  { RegisterNo: 1,
    chaban: {FIO: "Petrov", birthday: new Date()},
    Birthday: "22-10-1999",
    Purpose: "Перепродажа"

  }

]

@Component({
  selector: 'app-sheep-table',
  templateUrl: './sheep-table.component.html',
  styleUrls: ['./sheep-table.component.css']
})
export class SheepTableComponent implements OnInit {
  public pages = -1;
  constructor() { }

  ngOnInit(): void {
  }
  displayedColumns: string[] = ['registerno', 'chaban', 'birthday', 'actions'];
  dataSource = new MatTableDataSource(Animals_DATA);

  applyFilter(value: any) {
    this.dataSource.filter = value.toLowerCase().trim();
  }
}
