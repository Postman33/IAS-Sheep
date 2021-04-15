import {Component, Input, OnInit} from '@angular/core';
import {Animal} from '../../../interfaces/animal';
import {FormGroup} from '@angular/forms';
import {CrudService} from '../../../journalDB/crud.service';
import {Farm} from '../../../interfaces/farm';
import {Observable, of} from 'rxjs';
import {Otara} from '../../../interfaces/otara';
import {Chaban} from '../../../interfaces/chaban';

@Component({
  selector: 'app-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.css']
})
export class PassportComponent implements OnInit {

  @Input('animal') animal: Animal;
  @Input('parentFormGroup') ParentFormGroup: FormGroup;

  constructor(private crud: CrudService) {
  }

  public farms: Observable<Farm[]> = of([]);
  public otars: Observable<Otara[]> = of([]);
  public chabans: Observable<Chaban[]> = of([]);

  ngOnInit(): void {
    this.farms = this.crud.getCollection<Farm>('/api/farm');
    this.otars = this.crud.getCollection<Otara>('/api/otara');
    this.chabans = this.crud.getCollection<Chaban>('/api/chaban');
  }

  BloodType: number;

  get typeOfCreating() {
    return [
      'Искуственное осеменение',
    ];
  };

  get breeds() {
    return [
      'Ставропольская'
    ];
  };

  get typeAnimal() {
    return ['Овца', 'Баран'];
  }

  formatLabel(value: number) {
    return value * 100 + '%';
  }

  CorrectModel() {
    if (this.BloodType < 0) {
      this.BloodType = 0;
    }
    if (this.BloodType > 1) {
      this.BloodType = 1;
    }
  }

  get Generation(): [string: string] {
    return [
      'Чистопородное'
    ];
  }

  get bloodBreeds(): any {
    return [
      'Австралийский мясной меринос'
    ];
  }

  get colorsOfWool() {
    return ['Серая', "Белая", "Черная"]
  }


}
