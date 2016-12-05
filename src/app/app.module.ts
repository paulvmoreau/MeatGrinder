import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { appRouting } from './app.routes';
import { AppComponent } from './app.component';
import { BattleSimulatorRouting } from './battle-simulator/battle-simulator.routes';
import { BattleSimulatorService } from './battle-simulator/services/battle-simulator.service';
import { WarriorService } from './battle-simulator/services/warrior.service';
import { BattleSimulatorComponent } from './battle-simulator/battle-simulator.component';

@NgModule({
  declarations: [
    AppComponent,
    BattleSimulatorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    appRouting,
    BattleSimulatorRouting
  ],
  providers: [
    BattleSimulatorService,
    WarriorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
