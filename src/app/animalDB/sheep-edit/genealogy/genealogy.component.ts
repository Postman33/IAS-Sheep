import {Component, Input, OnInit, Output} from '@angular/core';
import {Observable, of} from 'rxjs';
import {CrudService} from '../../../journalDB/crud.service';
import {Animal} from '../../../interfaces/animal';
import {map, startWith, tap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {FormControl} from '@angular/forms';

import {EventEmitter} from '@angular/core';

@Component({
  selector: 'app-genealogy',
  templateUrl: './genealogy.component.html',
  styleUrls: ['./genealogy.component.css']
})
export class GenealogyComponent implements OnInit {

  @Input('parentFormGroup') parentFormGroup;
  @Input('animal') animal;
  @Output() updatedFatherValue: EventEmitter<string> = new EventEmitter<string>();
  @Output() updatedMotherValue: EventEmitter<string> = new EventEmitter<string>();

  constructor(private crud: CrudService, private route: ActivatedRoute) {
  }

  public animalsMother: Animal[] = [];
  public animalsFather: Animal[] = [];

  filteredMotherOptions: Observable<Animal[]> = of([]);
  filteredFatherOptions: Observable<Animal[]> = of([]);

  public formControlFather: FormControl = new FormControl();
  public formControlMother: FormControl = new FormControl();


  ngOnInit(): void {


    this.crud.getCollection<Animal>('/api/sheep').subscribe(response => {
      this.animalsMother = response.filter(a => {
        return (a.id != this.route.snapshot.params.id) && a.passport.typeAnimal === 'Овца';
      });
      this.animalsFather = response.filter(a => {
        return (a.id != this.route.snapshot.params.id) && a.passport.typeAnimal === 'Баран';
      });
      this.formControlFather.setValue(this.animal.genealogy.father);
      this.formControlMother.setValue(this.animal.genealogy.mother);
    });

    this.filteredMotherOptions = this.formControlMother.valueChanges
      .pipe(
        startWith(''),
        map(name => name ? this._filterMother(name) : this.animalsMother));

    this.filteredFatherOptions = this.formControlFather.valueChanges
      .pipe(
        startWith(''),
        map(name => name ? this._filterFather(name) : this.animalsFather));

  }

  private _filterMother(name: string): Animal[] {
    const filterValue = name;
    return this.animalsMother.filter(option => {
      return option.chipNo.indexOf(filterValue) === 0;
    });
  }

  private _filterFather(name: string): Animal[] {
    const filterValue = name;
    return this.animalsFather.filter(option => {
      return option.chipNo.indexOf(filterValue) === 0;
    });
  }

  displayFn(animal: Animal): string {
    return animal && animal.chipNo ? animal.chipNo : '';
  }

  OnSelectedOption() {
    this.updatedFatherValue.emit(this.formControlFather.value.id);
    this.updatedMotherValue.emit(this.formControlMother.value.id);
  }
}
