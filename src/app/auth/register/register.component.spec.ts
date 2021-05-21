import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";


import {SharedModule} from "../../shared/shared.module";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {throwError} from "rxjs";
import {By} from "@angular/platform-browser";
import {RegisterComponent} from "./register.component";
import {AuthService} from "../../shared/services/auth.service";
import {UtilsService} from "../../utils.service";

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let service: AuthService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      providers: [AuthService, UtilsService],
      imports: [
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents().then(()=> {

      fixture = TestBed.createComponent(RegisterComponent);
      component = fixture.componentInstance;
      service = TestBed.get(AuthService)
      fixture.detectChanges();

    })
  }));

  it('Должен создаваться компонент', () => {
    expect(component).toBeTruthy();
  });

  it("При ошибке со стороны сервера, должна показываться ошибка", () => {
    const err = "Ошибка"
    const spy = spyOn(service, "registerFn").and.returnValue(throwError(err))
    component.OnSubmit();
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css("div"))[1];
    const el: HTMLElement = de.nativeElement;
    expect(el.textContent).toContain(err);
  })

});
