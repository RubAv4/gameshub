import { TestBed } from '@angular/core/testing';

import { JuegosDataService } from './juegos-data.service';

describe('JuegosDataService', () => {
  let service: JuegosDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JuegosDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
