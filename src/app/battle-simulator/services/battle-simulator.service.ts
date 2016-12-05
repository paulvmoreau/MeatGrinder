import { Injectable } from '@angular/core';
import { WarriorService } from './warrior.service';
import { Warrior } from './warrior';

@Injectable()
export class BattleSimulatorService {
  private winner;
  private warriorArr: Warrior[];
  private roundCounter;
  private hitCounter;
  private totalDamage;
  private averageDamage;
  private stats;
  private battleResults = [];
  private resultsArray = [];
  private options;
  private warriors;

  constructor(private warriorService: WarriorService) {
    this.options = {
      totalHp: 0,
      sampleSize : 0,
      increment : 0,
      monsterKillsPerTurn : 0,
      monsterAc : 0,
      frightenedDC : 0,
      attackModifier : 0,
      frightSaveRange : 0,
      damageDice : 0,
      damageModifier : 0,
      tarrasqueHp : 0,
    }
    this.warriors = this.options.increment;
  }

  advancedBattleSim = () => {
    let warriorsLeft = this.warriors;
    let fighting = true;
    let options = this.options;
    let success = false;
    let warriorOptions = {
      frightSaveRange: this.options.frightSaveRange,
      damageDice: this.options.damageDice,
      damageModifier: this.options.damageModifier,
      attackModifier: this.options.attackModifier
    }
    this.roundCounter = 0;
    this.warriorArr = this.warriorService.getWarriorArray(this.warriors, warriorOptions);
    while(fighting){
      this.warriorArr.forEach(function(warrior, warIndex){
        if(warrior.isAlive()){
          if(!warrior.isFrightImmune()){
            let frightRoll = 0;
            if (warrior.options.carryOverFright > 0 ) {
              frightRoll = warrior.rollFrightSave('disadvantage');
            }else {
              frightRoll = warrior.rollFrightSave();
            }

            if(frightRoll >= options.frightenedDC){
              warrior.options.frightened = false;
              warrior.options.frightImmune = true;
            }else {
              warrior.options.frightened = true;
              warrior.options.carryOverFright++;
            }
          }
          if(!warrior.options.frightened){
            let hitRoll = warrior.rollAttack();
            if (hitRoll >= options.monsterAc) {
              let damage = warrior.damageRoll(hitRoll);
              options.totalHp -= damage;
              warrior.options.damageTotal += damage;
              warrior.options.hitCount++;
            }
          }
        }
      });

      for(var i =0; i < options.monsterKillsPerTurn; i++){
        let index = i+(this.roundCounter*options.monsterKillsPerTurn);
        if(warriorsLeft > 0){
          this.warriorArr[index].kill();
          warriorsLeft--;
        }
      }

      this.roundCounter++;
      this.options.totalHp = options.totalHp;
      if(warriorsLeft <= 0){
        fighting = false;
        this.winner = 'Tarrasque';
      }else if(this.options.totalHp <= 0){
        fighting = false;
        this.winner = 'Warriors';
      }
    }
    return this.getFinalStats();
  }

  getFinalStats = () => {
    let stats = {
      warriorsInBattle: this.warriors,
      hitCounter : 0,
      totalDamage : 0,
      averageDamage : 0,
      averageRoundFrightened: 0,
      totalTurnsMissed: 0,
      totalHp: this.options.totalHp,
      warriorsLeft: 0,
      totalRounds: this.roundCounter
    }
    this.warriorArr.forEach(function(warrior:Warrior, warIndex){
      stats.hitCounter += warrior.options.hitCount;
      stats.totalDamage += warrior.options.damageTotal;
      stats.totalTurnsMissed += warrior.options.carryOverFright;
      if(warrior.isAlive()){
        stats.warriorsLeft++;
      }
    });
    stats.averageDamage = stats.hitCounter > 0 ? stats.totalDamage / stats.hitCounter: 0;
    stats.averageRoundFrightened = stats.totalTurnsMissed / this.warriorArr.length;
    return stats;
  }

  clearCache = () => {
    this.battleResults = [];
    this.resultsArray = [];
    this.warriors = this.options.increment;
  }

  resetData = () => {
    this.winner = 'none';
    this.warriorArr = [];
    this.options.totalHp = this.options.tarrasqueHp;
    this.roundCounter = 1;
    this.hitCounter = 0;
    this.totalDamage = 0;
    this.averageDamage = 0;
    this.stats = {};
  }

  processResults = () => {
    let sampleSize = this.options.sampleSize;
    let tempArray = []
    this.battleResults.forEach(function(sample){
      let stats = {
        warriorsInBattle: sample[0].stats.warriorsInBattle,
        sumHits: 0,
        avgHits : 0,
        avgDamage : 0,
        sumDamage : 0,
        avgTurnsMissed: 0,
        sumTurnsMissed: 0,
        avgTotalHp : 0,
        sumTotalHp: 0,
        avgWarriorsLeft : 0,
        sumWarriorsLeft : 0,
        avgRounds: 0,
        sumRounds: 0,
        monsterWins :0,
        warriorWins :0
      }
      sample.forEach(function(result){
        stats.sumHits += result.stats.hitCounter;
        stats.sumDamage += result.stats.totalDamage;
        stats.sumTurnsMissed += result.stats.totalTurnsMissed;
        stats.sumWarriorsLeft += result.stats.warriorsLeft;
        stats.sumRounds += result.stats.totalRounds;
        stats.sumTotalHp += result.stats.totalHp;
        if(result.winner == 'Warriors'){
          stats.warriorWins++;
        }else{
          stats.monsterWins++;
        }
      });
      stats.avgHits = stats.sumHits / sampleSize;
      stats.avgDamage = stats.sumDamage / sampleSize;
      stats.avgTurnsMissed = stats.sumHits / sampleSize;
      stats.avgTotalHp = stats.sumTotalHp / sampleSize;
      stats.avgWarriorsLeft = stats.sumWarriorsLeft / sampleSize;
      stats.avgRounds = stats.sumRounds / sampleSize;
      tempArray.push(stats);
    });
    this.resultsArray = tempArray;
    return this.resultsArray;
  }

  getResultsArray = () => {
    return this.resultsArray;
  }

  runSim = (options) => {
    this.options = options;
    this.clearCache();
    while(this.warriors < 350){
      let sample = [];
      for(var i =0; i < this.options.sampleSize ; i++){
        let stats = this.advancedBattleSim();
        let battleResult = {
          warriorCount: this.warriors,
          winner: this.winner,
          stats : stats,
        }
        sample.push(battleResult);
        this.resetData();
      }
      this.battleResults.push(sample);
      this.warriors += this.options.increment;
      this.resetData();
    }
    return this.processResults();
  }

}
