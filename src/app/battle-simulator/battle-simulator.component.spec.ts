/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BattleSimulatorComponent } from './battle-simulator.component';

describe('BattleSimulatorComponent', () => {
  let component: BattleSimulatorComponent;
  let fixture: ComponentFixture<BattleSimulatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattleSimulatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
