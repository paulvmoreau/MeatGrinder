import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  private winner;
  private warriorArr = [];
  private totalHp;
  private roundCounter;
  private hitCounter;
  private totalDamage;
  private averageDamage;
  private stats;
  private battleResults = [];
  private resultsArray = [];
  private sampleSize = 5;
  private increment = 5;
  private monsterKillsPerTurn = 8;
  private monsterAc = 25;
  private frightenedDC = 17;
  private attackModifier = 5;
  private frightSaveModifier = 2;
  private damageDice = 6;
  private damageModifier = 3;
  private warriors = this.increment;

  ngOnInit() {
    this.resetData();
    this.runSim();
  }

  resetData = () => {
    this.winner = 'none';
    this.warriorArr = [];
    this.totalHp = 676;
    this.roundCounter = 1;
    this.hitCounter = 0;
    this.totalDamage = 0;
    this.averageDamage = 0;
    this.stats = {};
  }

  clearCache = () => {
    this.battleResults = [];
    this.resultsArray = [];
    this.warriors = this.increment;
  }

  runSim = () => {
    console.log("running sim");
    this.clearCache();
    while(this.warriors < 350){
      let sample = [];
      for(var i =0; i < this.sampleSize ; i++){
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
      this.warriors += this.increment;
      this.resetData();
    }
    this.processResults();
  }

  advancedBattleSim = () => {
    let warriorsLeft = this.warriors;
    let totalHp = this.totalHp;
    let fighting = true;
    let kPerTurn = this.monsterKillsPerTurn;
    let damageRoll = this.damageDice;
    let attackModifier = this.attackModifier;
    let damageModifier = this.damageModifier;
    let frightSaveModifier = this.frightSaveModifier;
    let freightfulResistance = this.frightenedDC;
    let ac = this.monsterAc;
    let success = false;

    this.roundCounter = 0;

    for(var i =0 ; i < this.warriors ; i++){
      let warrior = {
        frightened: false,
        frightImmune: false,
        carryOverFright: 0,
        hitCount : 0,
        damageTotal : 0,
        alive: true
      }
      this.warriorArr.push(warrior);
    }

    while(fighting){
      this.warriorArr.forEach(function(warrior, warIndex){
        if(warrior.alive){
          if(!warrior.frightImmune){
            let frightRoll = Math.ceil(Math.random() * 20) + frightSaveModifier;
            if(frightRoll >= freightfulResistance){
              warrior.frightened = false;
              warrior.frightImmune = true;
            }else{
              warrior.frightened = true;
              warrior.carryOverFright++;
            }
          }
          if(!warrior.frightened){
            let hitRoll = Math.ceil(Math.random() * 20) + attackModifier;
            if (hitRoll >= ac) {
              let damage = Math.ceil(Math.random() * damageRoll) + damageModifier;
              totalHp -= damage;
              warrior.damageTotal += damage;
              warrior.hitCount++;
            }
          }
        }
      });
      for(var i =0; i < kPerTurn; i++){
        let index = i+(this.roundCounter*kPerTurn);
        if(warriorsLeft > 0){
          this.warriorArr[index].alive = false;
          warriorsLeft--;
        }
      }

      this.roundCounter++;
      this.totalHp = totalHp;
      if(warriorsLeft <= 0){
        fighting = false;
        this.winner = 'Tarrasque';
      }
      if(totalHp <= 0){
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
      totalHp: this.totalHp,
      warriorsLeft: 0,
      totalRounds: this.roundCounter
    }
    this.warriorArr.forEach(function(warrior, warIndex){
      stats.hitCounter += warrior.hitCount;
      stats.totalDamage += warrior.damageTotal;
      stats.totalTurnsMissed += warrior.carryOverFright;
      if(warrior.alive){
        stats.warriorsLeft++;
      }
    });
    stats.averageDamage = stats.hitCounter > 0 ? stats.totalDamage / stats.hitCounter: 0;
    stats.averageRoundFrightened = stats.totalTurnsMissed / this.warriorArr.length;
    return stats;
  }

  processResults = () => {
    let sampleSize = this.sampleSize;
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
  }
}
