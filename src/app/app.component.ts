import { Component, OnInit } from '@angular/core';
import { BattleSimulatorComponent } from './battle-simulator/battle-simulator.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  private title = "Title Placeholder";
  constructor() {
  }

  ngOnInit() {
  }

}
