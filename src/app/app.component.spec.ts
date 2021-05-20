import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {throwError} from "rxjs";
import {By} from "@angular/platform-browser";
import {RouterTestingModule} from "@angular/router/testing";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {SharedModule} from "./shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports:[SharedModule,
        RouterTestingModule,
        BrowserAnimationsModule],
      providers: [],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

  });

  it('Приложение должно создаться', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'IAS-Sheep'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('IAS-Sheep');
  });


});
