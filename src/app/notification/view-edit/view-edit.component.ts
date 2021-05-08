import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

function timestampToDatetimeInputString(timestamp) {
  const date = new Date((timestamp + _getTimeZoneOffsetInMs()));
  return date.toISOString().slice(0, 19);
}

function _getTimeZoneOffsetInMs() {
  return new Date().getTimezoneOffset() * -60 * 1000;
}

@Component({
  selector: 'app-view-edit',
  templateUrl: './view-edit.component.html',
  styleUrls: ['./view-edit.component.css']
})
export class ViewEditComponent implements OnInit {

  constructor(private http : HttpClient) { }

  public form : FormGroup = new FormGroup({
    records: new FormArray([]),
  })
  get formControls(){
    return this.form.get('records')["controls"];
  }

  ngOnInit(): void {
    this.http.get("api/notify/").subscribe(data=>{
      console.log(data);
      for( let key in data){
        if (data.hasOwnProperty(key)){
          (<FormArray>this.form.get("records")).push( new FormGroup({
            id: new FormControl(data[key]["_id"]),
            name: new FormControl(data[key]["name"]),
            time: new FormControl(data[key]["time"].slice(0,-5)),
            header: new FormControl(data[key]["header"]),
            text:new FormControl(data[key]["text"])
          }))
        }
      }

    })
  }

  addNotify() {
    (<FormArray>this.form.get("records")).push( new FormGroup({
      id: new FormControl(null),
      name: new FormControl(""),
      time: new FormControl(timestampToDatetimeInputString(Date.now())),
      header: new FormControl(""),
      text:new FormControl("1")
    }))

  }

  removeControl(number: number) {
   this.form.get("records")["controls"][number].patchValue({
     name:"--REMOVE"
   });
  }

  SubmitForm() {
    console.log(this.form.value);
    this.http.post("api/notify/", this.form.value).subscribe( result => {
      console.log( result );
    })
  }
}
