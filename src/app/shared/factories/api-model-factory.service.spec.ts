import { TestBed } from '@angular/core/testing';

import { ApiModelFactory } from './api-model-factory.service';

describe('ApiModelFactory', () => {
  let service: ApiModelFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiModelFactory);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
