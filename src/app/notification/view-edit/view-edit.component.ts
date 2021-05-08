import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';

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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  public form : FormGroup = new FormGroup({
    records: new FormArray([]),
  })
  get formControls(){
    return this.form.get('records')["controls"];
  }
  addNotify() {
    let date = new Date();
    (<FormArray>this.form.get("records")).push(this.fb.group({
      id: null,
      name: "",
      time: timestampToDatetimeInputString(Date.now()),
      header: "",
      text:"1"
    }))

  }
}
