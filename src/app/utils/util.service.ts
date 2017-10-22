
import {Injectable} from "@angular/core";

@Injectable()
export class UtilService {

  /**
   * Check if a given value is null or Undefined
   * TODO - replace usage with isUndefined and isNull
   * @param x
   * @returns {boolean}
   */
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

  /**
   * Check if the users selects 'Altele' from the dropdown
   * @param part
   * @returns {boolean}
   */
  checkIsOther(part) {
    if(part === 3) {
      return true;
    }
    else{
      return false;
    }
  }

  /**
   * Check if a string is present in a property of a given object
   * @param partName
   * @param list
   * @returns {any}
   */

  containsObject(partName, list){
    var found = list.some(function (el) {
      return el.label.toUpperCase().trim() === partName.toUpperCase().trim();
    });
    return found;
  }

  /**
   * Return the max id for a given array of objects
   * @param itemsList
   * @returns {any}
   */
  getMaxIdNewItems(itemsList) {
    const maxId = Math.max.apply(Math,itemsList.map(function(o){return o.value;}))
    return maxId;
  }
}
