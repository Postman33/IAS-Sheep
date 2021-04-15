import {Component, Input, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Farm} from '../../../interfaces/farm';
import {CrudService} from '../../../journalDB/crud.service';
import {Animal} from '../../../interfaces/animal';
import {filter, map, startWith} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-genealogy',
  templateUrl: './genealogy.component.html',
  styleUrls: ['./genealogy.component.css']
})
export class GenealogyComponent implements OnInit {

  @Input("parentFormGroup") parentFormGroup
  constructor(private crud : CrudService, private route : ActivatedRoute) { }
  public animals: Animal[];
  public motherAutoComplete = new FormControl();
  public fatherAutoComplete = new FormControl();
  filteredMotherOptions: Observable<Animal[]>;
  filteredFatherOptions: Observable<Animal[]>;



  ngOnInit(): void {

  this.crud.getCollection<Animal>("/api/sheep").subscribe( response => {
      this.animals = response.filter( a => {return a.id !== this.route.snapshot.params.id})

  })
    this.filteredMotherOptions = this.motherAutoComplete.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

  }



  private _filter(value: Animal): Animal[] {
    return this.animals;
  }
  displayFn(animal: Animal): string {
    return animal && animal.chipNo ? animal.chipNo : '';
  }

}
