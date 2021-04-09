import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Farm} from '../farm-table/farm-table.component';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-farm-edit',
  templateUrl: './farm-edit.component.html',
  styleUrls: ['./farm-edit.component.css']
})
export class FarmEditComponent implements OnInit {

  constructor(private http: HttpClient,public route : ActivatedRoute, private router : Router) { }
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
    this.route.queryParams.subscribe( params => {
      console.log(params);
      if (params.create === "false") {
        this.pending = true
        this.http.get("/api/farm/"+this.route.snapshot.params.id).subscribe( (response:Farm) => {

          const {_id,...rest} = response;
          const obj : Farm = {...rest, id: response._id}
          this.FarmInfo = obj;
          this.form = new FormGroup({
            name: new FormControl(this.FarmInfo.name, [Validators.required]),
            city: new FormControl(this.FarmInfo.city, [Validators.required]),
            address: new FormControl(this.FarmInfo.address, [Validators.required]),
          })
          this.pending = false;

        })
      }

    })
  }
  UpdateFarm(farm :Farm ){
    return this.http.patch(`http://localhost:3000/api/farm/${farm.id}`,farm)
  }
  CreateFarm(farm :Farm ){
  return  this.http.post(`http://localhost:3000/api/farm/`,farm)
  }
  Submit($event: Event) {
  //$event.preventDefault();
    this.pending=true;
    const farm : Farm = { ... this.form.value }
    let sub : Observable<any>;
    if (this.route.snapshot.queryParams.create == "false") {
      farm.id = this.route.snapshot.params.id;
      sub= this.UpdateFarm(farm);
    } else {
      sub=this.CreateFarm(farm);
    }
    sub.subscribe(response => {
      console.log(response);
      this.pending=false;
      this.router.navigate(['/journal/farms'])
    })
  }
}
