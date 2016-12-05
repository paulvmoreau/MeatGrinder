import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BattleSimulatorComponent } from './battle-simulator/battle-simulator.component';

const routes: Routes = [
  {
    path: '**',
    pathMatch: 'full',
    component: BattleSimulatorComponent
  }
];

export const appRouting: ModuleWithProviders = RouterModule
  .forRoot(routes);
