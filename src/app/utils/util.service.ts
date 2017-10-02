
import {Injectable} from "@angular/core";
import {isUndefined} from "util";

@Injectable()
export class UtilService {

  check(x) {
    if (x == null) {
      return false;
    }

    if (x === null) {
      return false;
    }

    if (typeof x === 'undefined') {
      return false;
    }
    return true;
  }

  addOrUpdateArr(arr, newElement, arrIndex) {
    var index = arrIndex[newElement.pIndex];
    if(isUndefined(index)) {
      index = arr.length;
    }
    arrIndex[newElement.pIndex] = index;
    arr[index] = newElement;
    console.log(arr)
    //return arr;
  }
}
