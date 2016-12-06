/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BattleSimulatorComponent } from './battle-simulator.component';
import { BattleSimulatorService } from './services/battle-simulator.service';
import { WarriorService } from './services/warrior.service';

describe('BattleSimulatorComponent', () => {
  let component: BattleSimulatorComponent;
  let fixture: ComponentFixture<BattleSimulatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattleSimulatorComponent],
      imports: [FormsModule],
      providers: [BattleSimulatorService,
      WarriorService]
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
