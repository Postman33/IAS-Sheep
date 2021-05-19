import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { SheepTableComponent } from './sheep-table.component';
import {CrudService} from "../../journalDB/crud.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../../shared/shared.module";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {LoaderService} from "../../reports/loader.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {of} from "rxjs";
import {Animal} from "../../interfaces/animal";

describe('SheepTableComponent', () => {
  let component: SheepTableComponent;
  let fixture: ComponentFixture<SheepTableComponent>;
  let service : CrudService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SheepTableComponent ],
      providers: [CrudService, LoaderService, HttpClient],
      imports:[
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()

    fixture = TestBed.createComponent(SheepTableComponent);
    component = fixture.componentInstance;
    service = TestBed.get(CrudService)
    fixture.detectChanges();
  }));

  it('Должен создаваться компонент', () => {
    expect(component).toBeTruthy();
  });

  it("Должн",  (done:DoneFn)=>{ // TODO: Impliment this
   // const spy = spyOn(service,"getCollection").and.callThrough();



  })

});
