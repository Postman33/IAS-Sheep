import { Component, OnInit } from '@angular/core';
import {LoaderService} from '../loader.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-structure-sheep',
  templateUrl: './structure-sheep.component.html',
  styleUrls: ['./structure-sheep.component.css']
})
export class StructureSheepComponent implements OnInit {


  public form : FormGroup = new FormGroup(
    {
      date: new FormControl('',[Validators.required])
    }
  )
  public loading = false;
  constructor(private loader : LoaderService) { }

  ngOnInit(): void {
  }

  async SubmitReport() {
    this.data = {}
    this.loading=true;
    console.log(this.form.value);
    await this.preload('structure', this.form.value);
    console.log(this.data);
    this.loading=false;
  }

  private async preload(url : string, body){
    let data =await this.loader.preload(url, body );
    this.data = data;
  }

  data ;
  multi: any[];

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Вид животного';
  showYAxisLabel = true;
  yAxisLabel = 'Количество';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#69d4b6',
      '#9037e0','#c45656']
  };



  onSelect(event) {
    console.log(event);
  }






}
