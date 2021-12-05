/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SongSheetService } from './songSheet.service';

describe('Service: SongSheet', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SongSheetService]
    });
  });

  it('should ...', inject([SongSheetService], (service: SongSheetService) => {
    expect(service).toBeTruthy();
  }));
});
