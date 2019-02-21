import { TestBed } from '@angular/core/testing';

import { NgTabzService } from './ng-tabz.service';

describe('NgTabzService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgTabzService = TestBed.get(NgTabzService);
    expect(service).toBeTruthy();
  });
});
