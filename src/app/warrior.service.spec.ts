/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WarriorService } from './warrior.service';

describe('WarriorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WarriorService]
    });
  });

  it('should ...', inject([WarriorService], (service: WarriorService) => {
    expect(service).toBeTruthy();
  }));
});
