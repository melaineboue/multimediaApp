import { TestBed } from '@angular/core/testing';

import { GenererProgrammeService } from './generer-programme.service';

describe('GenererProgrammeService', () => {
  let service: GenererProgrammeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenererProgrammeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
