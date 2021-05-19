import { TestBed } from '@angular/core/testing';

import { CrossVarService } from './cross-var.service';

describe('CrossVarService', () => {
  let service: CrossVarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrossVarService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
