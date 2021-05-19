import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureSheepComponent } from './structure-sheep.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('StructureSheepComponent', () => {
  let component: StructureSheepComponent;
  let fixture: ComponentFixture<StructureSheepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructureSheepComponent ],
      imports: [        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    fixture = TestBed.createComponent(StructureSheepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
