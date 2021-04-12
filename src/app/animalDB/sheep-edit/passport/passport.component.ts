import {Component, Input, OnInit} from '@angular/core';
import {Animal} from '../../../interfaces/animal';
import {FormGroup} from '@angular/forms';
import {CrudService} from '../../../journalDB/crud.service';
import {Farm} from '../../../interfaces/farm';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.css']
})
export class PassportComponent implements OnInit {

  @Input("animal") animal : Animal;
  @Input("parentFormGroup") ParentFormGroup : FormGroup;
  constructor(private crud : CrudService) { }
  public farms : Observable<Farm[]> = of([]);
  ngOnInit(): void {
    this.farms = this.crud.getCollection<Farm>("/api/farm")
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

  get bloodBreeds(): any{
    return [
      "Ставропольская"
    ]
  }

  get colorsOfWool(){
    return ["Серая", "Белая", "Черная"]
  }


}
