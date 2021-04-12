import {Component, Input, OnInit} from '@angular/core';
import {Animal} from '../../../interfaces/animal';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.css']
})
export class PassportComponent implements OnInit {

  @Input("animal") animal : Animal;
  @Input("parentFormGroup") ParentFormGroup : FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

  BloodType: number;

  formatLabel(value: number) {
    return value*100 + "%";
  }

  CorrectModel() {
    if (this.BloodType < 0) this.BloodType = 0;
    if (this.BloodType > 1) this.BloodType = 1;
  }

  get Generation(): [string: string]{
    return [
      "Чистопородное"
    ]
  }


  get colorsOfWool(){
    return ["Серая", "Белая", "Черная"]
  }
}
