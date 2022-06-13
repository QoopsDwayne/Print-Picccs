import { TestBed } from '@angular/core/testing';

import { TcfpicsService } from './tcfpics.service';

describe('TcfpicsService', () => {
  let service: TcfpicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TcfpicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
