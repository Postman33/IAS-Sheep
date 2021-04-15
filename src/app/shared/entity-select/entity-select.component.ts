import {Component, Input, OnInit} from '@angular/core';
import {Farm} from '../../interfaces/farm';
import {Observable} from 'rxjs';
import {CrudService} from '../../journalDB/crud.service';

@Component({
  selector: 'app-entity-select',
  templateUrl: './entity-select.component.html',
  styleUrls: ['./entity-select.component.css']
})
export class EntitySelectComponent implements OnInit {

  constructor(private crud: CrudService) {
  }

  @Input('UrlCollection') url;
  @Input('ParentFormGroup') parentFormGroup;
  @Input('InputFormControlName') InputFormControlName;
  @Input('DisplayField') displayField;

  public collection: Observable<any>;

  ngOnInit(): void {
    this.collection = this.crud.getCollection(this.url);
  }

}
