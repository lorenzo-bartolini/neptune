import { TestBed } from '@angular/core/testing';

import { NeptuneService } from './neptune.service';

describe('NeptuneService', () => {
  let service: NeptuneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NeptuneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
