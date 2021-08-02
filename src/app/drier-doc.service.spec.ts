import { TestBed } from '@angular/core/testing';

import { DrierDocService } from './drier-doc.service';

describe('DrierDocService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DrierDocService = TestBed.get(DrierDocService);
    expect(service).toBeTruthy();
  });
});
