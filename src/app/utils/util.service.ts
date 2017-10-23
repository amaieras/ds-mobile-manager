import {Injectable} from '@angular/core';
import {isNull, isUndefined} from "util";

@Injectable()
export class UtilService {

  /**
   * Check if a given value is null or Undefined
   * TODO - replace usage with isUndefined and isNullOrUndefined
   * @param x
   * @returns {boolean}
   */
  public isNullOrUndefined(x) {
    return isNull(x) || isUndefined(x);
  }

  isAlteleOption(dropdownOption: string) {

  }

  /**
   * Check if the users selects 'Altele' from the dropdown
   * @param part
   * @returns {boolean}
   */
  checkIsOther(part) {
    if (part !== 3) {
      return false;
    } else {
      return true;
    }
  }
  /**
   * Check if a string is present in a property of a given object
   * @param partName
   * @param list
   * @returns {any}
   */

  containsObject(partName, list) {
    const found = list.some(function (el) {
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
      const maxId = Math.max.apply(Math, itemsList.map(function (o) {
        return o.id;
      }))
    console.log(maxId)
      return maxId;

  }
}
