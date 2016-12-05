import { Component, OnInit } from '@angular/core';
import { BattleSimulatorService } from './battle-simulator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  private winner;
  private warriorArr = [];
  private options = {
    totalHp: 0,
    sampleSize : 15,
    increment : 5,
    monsterKillsPerTurn : 8,
    monsterAc : 25,
    frightenedDC : 17,
    attackModifier : 5,
    frightSaveRange : 2,
    damageDice : 6,
    damageModifier : 3,
    tarrasqueHp : 676,
  }
  private resultsArray = [];

  constructor(private battleSimulatorService: BattleSimulatorService) {

  }

  ngOnInit() {
    this.battleSimulatorService.resetData();
    this.runSim();
  }

  runSim = () => {
    let results = this.battleSimulatorService.runSim(this.options);
    this.resultsArray = results;
  }

}
