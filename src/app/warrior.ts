export class Warrior {
  options = {
      frightened: false,
      frightImmune: false,
      carryOverFright: 0,
      hitCount : 0,
      damageTotal : 0,
      alive: true,
      damageDice: 0,
      damageModifier: 0,
      attackModifier: 0,
      frightSaveModifier: 0,
  }

  build = (options) => {
      this.options.damageDice = options.damageDice;
      this.options.damageModifier = options.damageModifier;
      this.options.attackModifier = options.attackModifier;
      this.options.frightSaveModifier = Math.floor(Math.random() * (options.frightSaveRange + 1));
  }

  rollAttack = (advantageDisadvantage:string = 'none') => {
    let hitRoll = Math.ceil(Math.random() * 20) + this.options.attackModifier;
    if(advantageDisadvantage != 'none'){
      let secondRoll = Math.ceil(Math.random() * 20) + this.options.attackModifier;
      if (advantageDisadvantage == 'advantage') {
        hitRoll = hitRoll <= secondRoll ? secondRoll : hitRoll;
      }else if (advantageDisadvantage == 'disadvantage'){
        hitRoll = hitRoll >= secondRoll ? secondRoll : hitRoll;
      }else {
        console.error("unknown disadvantage/advantage string: ", advantageDisadvantage);
      }
    }
    return hitRoll;
  }

  rollFrightSave = (advantageDisadvantage:string = 'none') =>{
    let saveRoll = Math.ceil(Math.random() * 20) + this.options.frightSaveModifier;
    if(advantageDisadvantage != 'none'){
      let secondRoll = Math.ceil(Math.random() * 20) + this.options.frightSaveModifier;
      if (advantageDisadvantage == 'advantage') {
        saveRoll = saveRoll <= secondRoll ? secondRoll : saveRoll;
      }else if (advantageDisadvantage == 'disadvantage'){
        saveRoll = saveRoll >= secondRoll ? secondRoll : saveRoll;
      }else {
        console.error("unknown disadvantage/advantage string: ", advantageDisadvantage);
      }
    }
    return saveRoll;
  }

  damageRoll = (attackRoll:number) => {
    let damage = Math.ceil(Math.random() * this.options.damageDice) + this.options.damageModifier;
    if(attackRoll == 20 + this.options.attackModifier){
      damage += Math.ceil(Math.random() * this.options.damageDice);
    }
    return damage;
  }

  isAlive = () => {
    return this.options.alive;
  }

  kill = () => {
    this.options.alive = false;
  }

  isFrightImmune = () => {
    return this.options.frightImmune;
  }

}
