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
  public errorMsg : string;
  public pending = false;
  public AnimalInfo: Animal = {
    id: '',
    chipNo: '123',
    passport: {
    }
  };

  public form: FormGroup = new FormGroup({
    birthday: new FormControl("", [Validators.required]),
    chipNo: new FormControl("", [Validators.required]),
    typeAnimal: new FormControl( "", [Validators.required]),
    generation: new FormControl("", [Validators.required]),
    colorPrimary: new FormControl( "", []),
    colorSecondary: new FormControl( "", []),
    colorSecondaryOpt: new FormControl( "", []),
    dateOfEntry: new FormControl( "", [Validators.required]),
    farm: new FormControl("", []),
    otara: new FormControl("", []),
    chaban: new FormControl( "", []),
    dateOfDisposal: new FormControl( "", []),
    reasonOfDisposal: new FormControl( "", []),
    isSelling: new FormControl("", []),
    bloodBreeds: new FormControl( "", []),
    typeOfCreating: new FormControl( "", []),
    bloodGroup: new FormControl("", []),
    bloodPercent: new FormControl( "", []),
    father: new FormControl("", []),
    mother: new FormControl('', [])
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



          this.form = new FormGroup({
            birthday: new FormControl(obj.passport.birthday, [Validators.required]),
            chipNo: new FormControl(obj.chipNo, [Validators.required]),
            typeAnimal: new FormControl(obj.passport.typeAnimal || "", [Validators.required]),
            generation: new FormControl(obj.passport.generation || "", [Validators.required]),
            colorPrimary: new FormControl(obj.passport.colorPrimary || "", []),
            colorSecondary: new FormControl(obj.passport.colorSecondary || "", []),
            colorSecondaryOpt: new FormControl(obj.passport.colorSecondaryOpt || "", []),
            dateOfEntry: new FormControl(obj.passport.dateOfEntry || "", [Validators.required]),
            farm: new FormControl(obj.passport.farm?._id || "", []),
            otara: new FormControl(obj.passport.otara?._id || "", []),
            chaban: new FormControl(obj.passport.chaban?._id || "", []),
            dateOfDisposal: new FormControl(obj.passport.dateOfDisposal || "", []),
            reasonOfDisposal: new FormControl(obj.passport.reasonOfDisposal || "", []),
            isSelling: new FormControl(obj.passport.isSelling || "", []),
            bloodBreeds: new FormControl(obj.passport.bloodBreeds || "", []),
            typeOfCreating: new FormControl(obj.passport.typeOfCreating || "", []),
            bloodGroup: new FormControl(obj.passport.bloodGroup || "", []),
            bloodPercent: new FormControl(obj.passport.bloodPercent || "", []),
            father: new FormControl("", []),

            mother: new FormControl('', [])
          });
            this.pending=false
        },
          err => {
          this.errorMsg = err
          }, ()=>{this.pending=false});
      }

    });
  }

  UpdateAnimal(animal: Animal) {
    return this.http.patch(`http://localhost:3000/api/sheep/${animal.id}`, animal);
  }

  CreateAnimal(animal: Animal) {
    return this.http.post(`http://localhost:3000/api/sheep/`, animal);
  }

  Submit($event: Event) {

    this.pending = true;

    const animal: Animal = {
      chipNo: this.form.value.chipNo, passport: {
        birthday: this.form.value.birthday,
        breed: this.form.value.breed,
        typeAnimal: this.form.value.typeAnimal,
        generation: this.form.value.generation,
        colorPrimary: this.form.value.colorPrimary,
        colorSecondary: this.form.value.colorSecondary,
        colorSecondaryOpt: this.form.value.colorSecondaryOpt,
        dateOfEntry: this.form.value.dateOfEntry,
        farm: this.form.value.farm ?? "",
        otara: this.form.value.otara ?? "",
        chaban: this.form.value.chaban ?? "",
        dateOfDisposal: this.form.value.dateOfDisposal,
        reasonOfDisposal: this.form.value.reasonOfDisposal,
        isSelling: this.form.value.isSelling,
        bloodBreeds: this.form.value.bloodBreeds,
        typeOfCreating: this.form.value.typeOfCreating,
        bloodGroup: this.form.value.bloodGroup,
        bloodPercent: this.form.value.bloodPercent,


      }
    };
    for( let key in animal.passport) {
      if (animal.passport.hasOwnProperty(key) && animal.passport[key] === ""){
        delete animal.passport[key];
      }
    }
    let sub: Observable<any>;
    if (this.route.snapshot.queryParams.create == 'false') {
      animal.id = this.route.snapshot.params.id;
      sub = this.UpdateAnimal(animal);
    } else {
      sub = this.CreateAnimal(animal);
    }
    sub.subscribe(response => {
      this.pending = false;
      this.router.navigate(['/animals/sheep']);
    });
  }
}
