import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Farm} from '../../interfaces/farm';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Animal} from '../../interfaces/animal';

@Component({
  selector: 'app-sheep-edit',
  templateUrl: './sheep-edit.component.html',
  styleUrls: ['./sheep-edit.component.css']
})
export class SheepEditComponent implements OnInit {

  constructor(private http: HttpClient, public route: ActivatedRoute, private router: Router) {
  }

  public pending = false;
  public AnimalInfo: Animal = {
    id: '',
    chipNo: '123',
    passport: {


    }
  };

  public form: FormGroup = new FormGroup({
    birthday: new FormControl('', [Validators.required]),
    labelNo: new FormControl('', [Validators.required]),
    typeAnimal: new FormControl('', [Validators.required]),
    generation: new FormControl('', [Validators.required]),
    colorPrimary: new FormControl('', [Validators.required]),
    colorSecondary: new FormControl('', [Validators.required]),
    colorSecondaryOpt: new FormControl('', [Validators.required]),
    dateOfEntry: new FormControl('', [Validators.required]),
    farm: new FormControl('', [Validators.required]),
    otara: new FormControl('', [Validators.required]),
    chaban: new FormControl('', [Validators.required]),
    dateOfDisposal: new FormControl('', [Validators.required]),
    reasonOfDisposal: new FormControl('', [Validators.required]),
    isSelling: new FormControl('', [Validators.required]),
    bloodBreeds: new FormControl('', [Validators.required]),
    typeOfCreating: new FormControl('', [Validators.required]),
    bloodGroup: new FormControl('', [Validators.required]),
    bloodPercent: new FormControl('', [Validators.required]),
    father: new FormControl('', [Validators.required]),

    mother: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    //if (this.route.snapshot.params.)
    this.route.queryParams.subscribe(params => {
      if (params.create === 'false') {
        this.pending = true;
        this.http.get('/api/sheep/' + this.route.snapshot.params.id).subscribe((response: Animal) => {

          const {_id, ...rest} = response;
          const obj: Animal = {...rest, id: response._id};
          this.AnimalInfo = obj;

          this.pending = false;

        });
      }

    });
  }

  UpdateAnimal(farm: Farm) {
    return this.http.patch(`http://localhost:3000/api/sheep/${farm.id}`, farm);
  }

  CreateAnimal(farm: Farm) {
    return this.http.post(`http://localhost:3000/api/sheep/`, farm);
  }

  Submit($event: Event) {
    console.log(this.form);
    //$event.preventDefault();
    this.pending = true;
    const farm: Farm = {...this.form.value};
    let sub: Observable<any>;
    if (this.route.snapshot.queryParams.create == 'false') {
      farm.id = this.route.snapshot.params.id;
      sub = this.UpdateAnimal(farm);
    } else {
      sub = this.CreateAnimal(farm);
    }
    sub.subscribe(response => {

      this.pending = false;
      this.router.navigate(['/animals/sheep']);
    });
  }
}
