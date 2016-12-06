import { Injectable } from '@angular/core';
import { Warrior } from './warrior';

@Injectable()
export class WarriorService {

  constructor() { }

  getWarriorArray = (size: number, options: {}) => {
    let tempArray = [];
    for (let i = 0 ; i < size ; i++) {
      let warrior = new Warrior();
      warrior.build(options);
      tempArray.push(warrior);
    }
    return tempArray;
  }

}
