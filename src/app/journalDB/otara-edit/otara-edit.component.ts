import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Otara} from '../../interfaces/otara';

@Component({
  selector: 'app-otara-edit',
  templateUrl: './otara-edit.component.html',
  styleUrls: ['./otara-edit.component.css']
})
export class OtaraEditComponent implements OnInit {

  constructor(private http: HttpClient,public route : ActivatedRoute, private router : Router) { }
  public pending = false;
  public OtaraInfo : Otara = {
    name:" Test"
  }
  public form : FormGroup = new FormGroup({
    name: new FormControl(this.OtaraInfo.name, [Validators.required]),
  })
  ngOnInit(): void {
    console.log(this.route.snapshot.queryParams);
    //if (this.route.snapshot.params.)
    this.route.queryParams.subscribe( params => {
      console.log(params);
      if (params.create === "false") {
        this.pending = true
        this.http.get("/api/otara/"+this.route.snapshot.params.id).subscribe( (response:Otara) => {

          const {_id,...rest} = response;
          const obj : Otara = {...rest, id: response._id}
          this.OtaraInfo = obj;
          this.form.patchValue({
            name: this.OtaraInfo.name,
          })

          this.pending = false;

        })
      }

    })
  }
  UpdateOtara(otara :Otara ){
    return this.http.patch(`/api/otara/${otara.id}`,otara)
  }
  CreateOtara(otara :Otara ){
    return  this.http.post(`/api/otara/`,otara)
  }
  Submit($event: Event) {
    //$event.preventDefault();
    this.pending=true;
    const farm : Otara = { ... this.form.value }
    let sub : Observable<any>;
    if (this.route.snapshot.queryParams.create == "false") {
      farm.id = this.route.snapshot.params.id;
      sub= this.UpdateOtara(farm);
    } else {
      sub=this.CreateOtara(farm);
    }
    sub.subscribe(response => {
      console.log(response);
      this.pending=false;
      this.router.navigate(['/journal/otars'])
    })
  }

}
