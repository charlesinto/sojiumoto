import { TestBed } from '@angular/core/testing';

import { CreateApartmentService } from './create-apartment.service';

describe('CreateApartmentService', () => {
  let service: CreateApartmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateApartmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
