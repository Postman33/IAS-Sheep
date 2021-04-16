import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {CrudService} from '../../journalDB/crud.service';


@Component({
  selector: 'app-entity-auto-complete',
  templateUrl: './entity-auto-complete.component.html',
  styleUrls: ['./entity-auto-complete.component.css']
})
export class EntityAutoCompleteComponent implements OnInit {
  @Input("collectionUrl") url;
  @Input("DisplayName") displayName='';

  @Input("label") label='no "label" information';
  @Input("ParentFormGroup") parentFormGroup;
  @Input("FormControlName") formControlName;
  @Input("disabled") disabled = false;
  myControl: FormControl;
  options: any[] = [];
  filteredOptions: Observable<any[]>;
  public displayFn: (any: any) => string;

  constructor(private crud : CrudService) {
  }

  ngOnInit() {
    this.myControl = this.parentFormGroup.get(this.formControlName);
     this.crud.getCollection<any>(this.url).subscribe( options => {
      this.options = options;
    })

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value[this.displayName]),
        map(name => name ? this._filter(name) : this.options.slice())
      );
     this.displayFn = function(any): string {
       if (any == null) return '';
         return any[this.displayName]

    }.bind(this);
  }



  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option[this.displayName].toLowerCase().indexOf(filterValue) === 0);
  }
}
