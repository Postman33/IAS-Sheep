import {Component, Input, OnInit} from '@angular/core';
import {Animal} from '../../../interfaces/animal';

@Component({
  selector: 'app-evolution',
  templateUrl: './evolution.component.html',
  styleUrls: ['./evolution.component.css']
})
export class EvolutionComponent implements OnInit {

  @Input("animal") animal : Animal;
  constructor() { }

  ngOnInit(): void {
  }

}
