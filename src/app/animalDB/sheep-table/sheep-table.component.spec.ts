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
import {EMPTY, of, throwError} from "rxjs";
import {Animal} from "../../interfaces/animal";
import {By} from "@angular/platform-browser";

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

  it("Должен вызываться метод getCollection в ngOnInit",  ()=>{ // TODO: Impliment this
    const spy = spyOn(service,"getCollection").and.returnValue(of([
      {chipNo:"",
      passport:{}}
    ]));
    component.ngOnInit();
    expect(spy).toHaveBeenCalled()
  })
  it("При загрузке информация должна записываться в переменную sheeps",  ()=>{ // TODO: Impliment this
    const spy = spyOn(service,"getCollection").and.returnValue(of([
      {chipNo:"",
        passport:{}}
    ]));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.sheeps.length).toBe(1)
  })


  it("При ошибке получения данных должна показаться ошибка",  ()=>{
    const err = "Error"
    const spy = spyOn(service,"getCollection").and.returnValue(throwError(err));
    component.ngOnInit();
    fixture.detectChanges();

    const de = fixture.debugElement.query(By.css(".alert"));
    const el : HTMLElement = de.nativeElement;

    expect(component.errorMsg).not.toBe(undefined)
    expect(el.textContent).toContain(err)
  })
});
