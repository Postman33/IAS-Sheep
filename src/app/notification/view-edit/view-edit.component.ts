import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {UtilsService} from "../../utils.service";

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

  constructor(private http : HttpClient, private utils : UtilsService) { }
  public pending = false;
  public form : FormGroup = new FormGroup({
    records: new FormArray([]),
  })
  get formControls(){
    return this.form.get('records')["controls"];
  }

  ngOnInit(): void {
    this.pending = true;
    this.http.get("api/notify/").subscribe(data=>{
      //console.log(data);
      this.pending = false;
      for( let key in data){
        if (data.hasOwnProperty(key)){
          (<FormArray>this.form.get("records")).push( new FormGroup({
            id: new FormControl(data[key]["_id"]),
            name: new FormControl(data[key]["name"]),
            time: new FormControl(data[key]["time"].slice(0,-5)),
            header: new FormControl(data[key]["header"]),
            text:new FormControl(data[key]["text"]),
            completed: new FormControl(data[key]["completed"] || false) ,
          }))
        }
      }

    })
  }

  addNotify() {
    (<FormArray>this.form.get("records")).push( new FormGroup({
      id: new FormControl(null),
      name: new FormControl("",[Validators.required]),
      time: new FormControl(timestampToDatetimeInputString(Date.now()),[Validators.required]),
      header: new FormControl("",[Validators.required]),
      text:new FormControl("",[Validators.required])
    }))

  }

  removeControl(number: number) {
    if (this.form.get("records")["controls"][number].value.id == null) {
      (<FormArray>this.form.get("records")).removeAt(number);
      return;
    }
   this.form.get("records")["controls"][number].patchValue({
     name:"--REMOVE"
   });
  }

  SubmitForm() {
    console.log(this.form.value);
    this.http.post("api/notify/", this.form.value).subscribe( result => {
      console.log( result );
      this.utils.openSnackBar("Сохранено!","Сообщение")
    })
  }
}
