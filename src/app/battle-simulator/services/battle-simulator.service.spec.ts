/* tslint:disable:no-unused-variable */
import {} from 'jasmine';
import { TestBed, async, inject } from '@angular/core/testing';
import { BattleSimulatorService } from './battle-simulator.service';
import { WarriorService } from './warrior.service';


describe('BattleSimulatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BattleSimulatorService, WarriorService]
    });
  });

  it('should ...', inject([BattleSimulatorService], (service: BattleSimulatorService) => {
    expect(service).toBeTruthy();
  }));
});
