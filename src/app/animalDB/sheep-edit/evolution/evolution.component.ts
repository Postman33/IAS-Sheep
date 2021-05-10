import {Component, Input, OnInit} from '@angular/core';
import {Animal} from '../../../interfaces/animal';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-evolution',
  templateUrl: './evolution.component.html',
  styleUrls: ['./evolution.component.css']
})
export class EvolutionComponent implements OnInit {


  constructor(private http: HttpClient, private route : ActivatedRoute) { }
  public response = [];
  ngOnInit(): void {
    this.http.get("api/sheep/"+this.route.snapshot.params.id+"/stats").subscribe(res=>{
      if (res == "000") { return; }
      for( let k in res){
        this.response.push({key: k, ...res[k]})
      }
      console.log(this.response);
     // this.response = res;
    })
    console.log("test");
  }

}
