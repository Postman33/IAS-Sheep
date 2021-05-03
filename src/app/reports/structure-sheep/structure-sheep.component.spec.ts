import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureSheepComponent } from './structure-sheep.component';

describe('StructureSheepComponent', () => {
  let component: StructureSheepComponent;
  let fixture: ComponentFixture<StructureSheepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructureSheepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureSheepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
