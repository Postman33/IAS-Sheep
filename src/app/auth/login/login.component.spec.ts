import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

import {CrudService} from "../../journalDB/crud.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../../shared/shared.module";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {LoaderService} from "../../reports/loader.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {EMPTY, of, throwError} from "rxjs";
import {Animal} from "../../interfaces/animal";
import {By} from "@angular/platform-browser";
import {LoginComponent} from "./login.component";
import {AuthService} from "../../shared/services/auth.service";
import {UtilsService} from "../../utils.service";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: AuthService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [AuthService, HttpClient, UtilsService],
      imports: [
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
      .then(()=> {
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      service = TestBed.get(AuthService)
      fixture.detectChanges();
    })
  }));

  it('Должен создаваться компонент', () => {
    expect(component).toBeTruthy();
  });

  it("При ошибке со стороны сервера, должна показываться ошибка", () => {
    const err = "Ошибка";
    let e;
    const spy = spyOn(service, "loginFn").and.returnValue(throwError(err))
    component.OnSubmit()

    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css("div"))[1];
    const el: HTMLElement = de.nativeElement;

    expect(el.textContent).toContain(err);

  })

});
