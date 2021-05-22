import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

import {map, startWith} from 'rxjs/operators';
import {CrudService} from '../crud.service';
import {MatOption} from '@angular/material/core';

import {UtilsService} from '../../utils.service';
import {Farm} from '../../interfaces/farm';
import {Chaban} from '../../interfaces/chaban';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";


@Component({
  selector: 'app-chanban-edit',
  templateUrl: './chanban-edit.component.html',
  styleUrls: ['./chanban-edit.component.css']
})
export class ChanbanEditComponent implements OnInit {

  constructor(private http: HttpClient, public route: ActivatedRoute,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router, private crud: CrudService, public utilsService: UtilsService) {
  }

  public autoCompleteControl = new FormControl();
  public options: Farm[] = [];
  public filteredOptions: Observable<Farm[]>;
  public SelectedFarm: Farm = null;

  public pending = false;
  public ChabanInfo: Chaban = {
    birthday: new Date(1999, 10, 2), id: 'Id', FIO: 'Name', farm: []
  };
  public form: FormGroup = new FormGroup({
    FIO: new FormControl(this.ChabanInfo.FIO, [Validators.required]),
    birthday: new FormControl(this.ChabanInfo.birthday, [Validators.required]),
    farm: new FormArray([], [])
  });

  private fetchData(){
    this.crud.getCollection<Farm>('/api/farm').subscribe((response: Farm[]) => {
      this.options = response;
    });
  }
  ngOnInit(): void {

    this.filteredOptions = this.autoCompleteControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );

    this.fetchData();



      if (this.data.create === 'false') {
        this.pending = true;
        this.http.get('/api/chaban/' + this.data.id).subscribe((response: Chaban) => {
          const {_id, ...rest} = response;
          const obj: Chaban = {...rest, id: response._id};
          this.ChabanInfo = obj;
          const formcontrols: FormControl[] = [];
          for (let farm of obj.farm) {
            formcontrols.push(new FormControl(farm._id));
          }
          this.form = new FormGroup({
            FIO: new FormControl(this.ChabanInfo.FIO, [Validators.required]),
            birthday: new FormControl(this.ChabanInfo.birthday, [Validators.required]),
            farm: new FormArray(formcontrols, [])
          });

          this.pending = false;
        });
      }



  }

  ChangeOption(option: MatOption) {
    this.SelectedFarm = option.value;
  }

  AddFarm() {

    for (let i = 0; i < (<FormArray> this.form.get("farm")).controls.length; i++) {
      if (this.SelectedFarm.id == (<FormArray> this.form.get('farm')).controls[i].value) {
        this.utilsService.openSnackBar('Нельзя повторно добавить элемент!', 'Ошибка');
        return;
      }
    }

    const control: FormControl = new FormControl(this.SelectedFarm.id, []);
    (this.form.get('farm') as FormArray).push(control);
    console.log(this.form.value);
    this.ChabanInfo.farm.push(this.SelectedFarm);
    this.autoCompleteControl.setValue('');
  }

  RemoveControl(id: string) {
    console.log(this.form.get('farm'));
    for (let i = 0; i < (<FormArray> this.form.get("farm")).controls.length; i++) {
      if (id == (<FormArray> this.form.get('farm')).controls[i].value) {
        (<FormArray> this.form.get('farm')).removeAt(i);
      }
    }
    this.ChabanInfo.farm = this.ChabanInfo.farm.filter(item => {
      return item._id !== id;
    });
  }

  UpdateChaban(chaban: Chaban) {
    return this.http.patch(`/api/chaban/${chaban.id}`, chaban);
  }

  CreateChaban(chaban: Chaban) {
    return this.http.post(`/api/chaban/`, chaban);
  }

  Submit($event: Event) {
    this.pending = true;
    const chaban: Chaban = {...this.form.value};
    let sub: Observable<any>;
    if (this.data.create === 'false') {
      chaban.id = this.data.id;
      sub = this.UpdateChaban(chaban);
    } else {
      sub = this.CreateChaban(chaban);
    }
    sub.subscribe(response => {

      this.pending = false;

    });
  }

  displayFn(farm: Farm): string {
    return farm && farm.name ? farm.name : '';
  }

  private _filter(name: string): Farm[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }


}
