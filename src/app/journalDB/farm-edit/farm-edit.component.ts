import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {Farm} from '../../interfaces/farm';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-farm-edit',
  templateUrl: './farm-edit.component.html',
  styleUrls: ['./farm-edit.component.css']
})
export class FarmEditComponent implements OnInit {

  constructor(private http: HttpClient,public route : ActivatedRoute, private router : Router,
              @Inject(MAT_DIALOG_DATA) public data: any) { }
  public pending = false;
  public FarmInfo : Farm = {
    address: 'Address', id: 'Id', name: 'Name', city: "City"
  }
  public form : FormGroup = new FormGroup({
    name: new FormControl(this.FarmInfo.name, [Validators.required]),
    city: new FormControl(this.FarmInfo.city, [Validators.required]),
    address: new FormControl(this.FarmInfo.address, [Validators.required]),
  })
  ngOnInit(): void {
    console.log(this.route.snapshot.queryParams);
    //if (this.route.snapshot.params.)


    if (this.data.create === 'false') {
        this.pending = true
        this.http.get("/api/farm/"+this.data.id).subscribe( (response:Farm) => {

          const {_id,...rest} = response;
          const obj : Farm = {...rest, id: response._id}
          this.FarmInfo = obj;
          this.form.patchValue({
            name: this.FarmInfo.name,
            city: this.FarmInfo.city,
            address: this.FarmInfo.address
          })

          this.pending = false;

        })
      }


  }
  UpdateFarm(farm :Farm ){
    return this.http.patch(`/api/farm/${farm.id}`,farm)
  }
  CreateFarm(farm :Farm ){
  return  this.http.post(`/api/farm/`,farm)
  }
  Submit($event: Event) {
    this.pending=true;
    const farm : Farm = { ... this.form.value }
    let sub : Observable<any>;
    if (this.data.create === 'false') {
      farm.id = this.data.id;
      sub= this.UpdateFarm(farm);
    } else {
      sub=this.CreateFarm(farm);
    }
    sub.subscribe(response => {
      console.log(response);
      this.pending=false;

    })
  }
}
