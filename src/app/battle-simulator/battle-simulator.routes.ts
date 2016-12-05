import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BattleSimulatorComponent } from './battle-simulator.component';

const BattleSimulatorRoutes: Routes = [{
  path: '',
  component: BattleSimulatorComponent,
}];

export const BattleSimulatorRouting: ModuleWithProviders = RouterModule
  .forChild(BattleSimulatorRoutes);
