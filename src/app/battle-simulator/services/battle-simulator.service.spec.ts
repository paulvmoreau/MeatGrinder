/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BattleSimulatorService } from './battle-simulator.service';

describe('BattleSimulatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BattleSimulatorService]
    });
  });

  it('should ...', inject([BattleSimulatorService], (service: BattleSimulatorService) => {
    expect(service).toBeTruthy();
  }));
});
