import { TestBed } from '@angular/core/testing';

import { SearchAndFilterService } from './search-and-filter.service';

describe('SearchAndFilterService', () => {
  let service: SearchAndFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchAndFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
