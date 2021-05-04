import {Component, OnInit} from '@angular/core';
import {LoaderService} from '../loader.service';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  constructor(private loader:  LoaderService,private http : HttpClient) { }
  public data : Object
   range = new FormGroup({
    start: new FormControl('',[Validators.required]),
    end: new FormControl('',[Validators.required])
  });
  public loading : boolean = false;

  ngOnInit(): void {

  }

  private async preload(url : string, body){
    let data =await this.loader.preload(url, body );
    for (let resKey in data ){
        if (data.hasOwnProperty(resKey)){
          this.data[resKey] = data[resKey];
        }
    }
  }

  view: any[] = [700, 300];


  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };


  onSelect(data): void {
   // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
   // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    //console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }


  async SubmitReport() {
    this.data = {}
    this.loading=true;
    await this.preload('stats', this.range.value);
    console.log(this.data);
    this.loading=false;
  }
}
