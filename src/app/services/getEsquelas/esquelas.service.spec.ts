import { TestBed } from '@angular/core/testing';

import { EsquelasService } from './esquelas.service';

describe('EsquelasService', () => {
  let service: EsquelasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EsquelasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
