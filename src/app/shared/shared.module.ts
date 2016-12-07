import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { ConditionsComponent } from './conditions/conditions.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SharedComponent, ConditionsComponent]
})
export class SharedModule { }
