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

  it('should run full simulation and get results array', inject([BattleSimulatorService], (service: BattleSimulatorService) => {
    let options = {
      totalHp: 0,
      sampleSize : 1,
      increment : 50,
      monsterKillsPerTurn : 8,
      monsterAc : 25,
      frightenedDC : 17,
      attackModifier : 5,
      frightSaveRange : 4,
      damageDice : 6,
      damageModifier : 3,
      tarrasqueHp : 676,
    };
    let results = service.runSim(options);
    expect(results.length).toBeGreaterThan(1);
  }));

  it('should run single simulation and get stats', inject([BattleSimulatorService], (service: BattleSimulatorService) => {
    service.options = {
      totalHp: 0,
      sampleSize : 1,
      increment : 50,
      monsterKillsPerTurn : 8,
      monsterAc : 25,
      frightenedDC : 17,
      attackModifier : 5,
      frightSaveRange : 4,
      damageDice : 6,
      damageModifier : 3,
      tarrasqueHp : 676,
    };
    service.clearCache();
    let stats = service.advancedBattleSim();
    let props = [
      'warriorsInBattle',
      'hitCounter',
      'totalDamage',
      'averageDamage',
      'averageRoundFrightened',
      'totalTurnsMissed',
      'totalHp',
      'warriorsLeft',
      'totalRounds'
    ];
    props.forEach(function(prop){
      expect(stats[prop]).toBeTruthy();
    });
  }));
});
