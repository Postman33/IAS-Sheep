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
  public Father : Animal;
  public Mother : Animal;
  ngOnInit(): void {
    this.http.get("api/sheep/"+this.route.snapshot.params.id+"/stats").subscribe(res=>{
      console.log(res);
    })
    console.log("test");
  }

}
