import {MainEventsComponent} from "./main-events.component";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {CrudService} from "../../crud.service";
import {HttpClient} from "@angular/common/http";
import {UtilsService} from "../../../utils.service";
import {SharedModule} from "../../../shared/shared.module";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormControl, Validators} from "@angular/forms";
import {EMPTY, of} from "rxjs";

describe('MainEventsComponent', () => {
  let component: MainEventsComponent;
  let fixture: ComponentFixture<MainEventsComponent>;
  let service: CrudService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainEventsComponent],
      providers: [ HttpClient, UtilsService],
      imports: [
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
      .then(()=> {
        fixture = TestBed.createComponent(MainEventsComponent);
        component = fixture.componentInstance;
        service = TestBed.get(CrudService)
        fixture.detectChanges();
      });
  }));

  it('Должен создаваться компонент', () => {
    expect(component).toBeTruthy();
  });

  it("Должна быть форма бонитировки", () => {
    expect(component.form.contains("бонитировка")).toBeTruthy();
  })
  it("Должна быть форма стрижки", () => {
    expect(component.form.contains("стрижка")).toBeTruthy();
  })
  it("Должна быть форма взвешивания", () => {
    expect(component.form.contains("взвешивание")).toBeTruthy();
  })
  it("Валидация по паттерну  Validators.pattern('^[0-9.]+$')",()=>{
    const controlWeight = component.form.get("взвешивание").get("weight");
    const controlweightDirt = component.form.get("стрижка").get("weightDirt");
    const controlwoolWidth = component.form.get("стрижка").get("woolWidth");

    controlWeight.setValue("-10")
    controlweightDirt.setValue("-10g")
    controlwoolWidth.setValue("-10")

    expect(controlWeight.valid).not.toBeTruthy()
    expect(controlweightDirt.valid).not.toBeTruthy()
    expect(controlwoolWidth.valid).not.toBeTruthy()
  })

  it("Удаляет при подтверждении в confirm",()=>{
    const spy = spyOn(component,"removeEvent").and.callThrough()
    spyOn(window,"confirm").and.returnValue(true)
    component.removeEvent("1");
    expect(spy).toHaveBeenCalledWith('1')
  })

  it("Вызов confirm при удалении",()=>{
    spyOn(component,"removeEvent").and.callThrough()
    const spy = spyOn(window,"confirm")
    component.removeEvent("1");
    expect(spy).toHaveBeenCalled()
  })


});
