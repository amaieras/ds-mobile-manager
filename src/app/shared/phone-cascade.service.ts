
import {Injectable} from '@angular/core';

@Injectable()
export class PhoneCascadeService {
  private mainArray: any[] = [];

  constructor() {}

  addToArr(val) {
    this.mainArray.push(val);
  }
  getArr() {
    return this.mainArray;
  }
}
