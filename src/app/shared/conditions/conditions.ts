export interface Conditions {
  canDoActions(): boolean;
  canDoReactions(): boolean;
  attackModifications(): string; // can be 'none', 'disadvantage', or 'advantage'
  defenceModifications(): string; // can be 'none', 'disadvantage', or 'advantage'
  canMove(): boolean;
  movementModifier(): number; // a number to indicate the fraction of movement speed
  directionModifer(): string; // can be 'none', 'away', or 'towards'
  canHear(): boolean;
  canSee(): boolean;
  setup(dc: number, stat: string);
  getSaveStat(): string;
  attemptSave(modifier: number);
  isActive(): boolean;
  disable();
  enable();
}
