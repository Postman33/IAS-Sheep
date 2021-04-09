import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheepTableComponent } from './sheep-table.component';

describe('SheepTableComponent', () => {
  let component: SheepTableComponent;
  let fixture: ComponentFixture<SheepTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SheepTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SheepTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
