import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoaderService} from '../loader.service';

@Component({
  selector: 'app-report-custom',
  templateUrl: './report-custom.component.html',
  styleUrls: ['./report-custom.component.css']
})
export class ReportCustomComponent implements OnInit {

  constructor(private loader : LoaderService) { }

  public form : FormGroup = new FormGroup(
    {
      date: new FormControl('',[Validators.required])
    }
  );
  public loading :boolean = false;
  public data;
  reportsOptions = [
    {name:"По ферме", view: "farm"}
  ];
  private async preload(url : string, body){
    let data =await this.loader.preload(url, body );
    this.data = data;
  }

  ngOnInit(): void {
  }

  async SubmitReport() {
    this.data = {}
    this.loading=true;
    console.log(this.form.value);
    await this.preload('custom', this.form.value);
    console.log(this.data);
    this.loading=false;
  }
}
