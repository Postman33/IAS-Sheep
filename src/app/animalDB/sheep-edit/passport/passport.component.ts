import {Component, Input, OnInit} from '@angular/core';
import {Animal} from '../../../interfaces/animal';
import {FormGroup} from '@angular/forms';
import {$e} from 'codelyzer/angular/styles/chars';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.css']
})
export class PassportComponent implements OnInit {

  @Input("animal") animal : Animal;
  @Input("parentFormGroup") PFG : FormGroup;
  constructor() { }

  ngOnInit(): void {
  }
  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
  BloodType: number;

  formatLabel(value: number) {
    return value*100 + "%";
  }

  CorrectModel($event: any) {
    if (this.BloodType < 0) this.BloodType = 0;
    if (this.BloodType > 1) this.BloodType = 1;
  }
}
