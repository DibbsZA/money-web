import { TestBed } from '@angular/core/testing';

import { AbsaApiService } from './absa-api.service';

describe('AbsaApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AbsaApiService = TestBed.get(AbsaApiService);
    expect(service).toBeTruthy();
  });
});
