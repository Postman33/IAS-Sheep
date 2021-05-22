import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Otara} from '../../interfaces/otara';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-otara-edit',
  templateUrl: './otara-edit.component.html',
  styleUrls: ['./otara-edit.component.css']
})
export class OtaraEditComponent implements OnInit {

  constructor(private http: HttpClient,public route : ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: any) { }
  public pending = false;
  public OtaraInfo : Otara = {name:""}
  public form : FormGroup = new FormGroup({
    name: new FormControl(this.OtaraInfo.name, [Validators.required]),
  })
  ngOnInit(): void {

    if (this.data.create === 'false') {
        this.pending = true
        this.http.get("/api/otara/"+ this.data.id).subscribe( (response:Otara) => {

          const {_id,...rest} = response;
          const obj : Otara = {...rest, id: response._id}
          this.OtaraInfo = obj;
          this.form.patchValue({
            name: this.OtaraInfo.name,
          })
          this.pending = false;

        })
      }

  }
  UpdateOtara(otara :Otara ){
    return this.http.patch(`/api/otara/${otara.id}`,otara)
  }
  CreateOtara(otara :Otara ){
    return  this.http.post(`/api/otara/`,otara)
  }
  Submit($event: Event) {
    this.pending=true;
    const otara : Otara = { ... this.form.value }
    let sub : Observable<any>;
    if (this.data.create === 'false') {
      otara.id = this.data.id;
      sub= this.UpdateOtara(otara);
    } else {
      sub=this.CreateOtara(otara);
    }
    sub.subscribe(response => {
      this.pending=false;
    })
  }

}
