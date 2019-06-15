import {Injectable} from '@angular/core';
import {isNull, isUndefined} from 'util';
import {Message} from 'primeng/api';

@Injectable()
export class UtilService {

  /**
   * Check if a given value is null or Undefined
   * TODO - replace usage with isUndefined and isNullOrUndefined
   * @param x
   * @returns {boolean}
   */
  public isNullOrUndefined(x) {
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
    if (part.toLowerCase() !== 'altele') {
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

  containsObject(newName, list) {
    const found = list.some(function (el) {
      return el.label.toUpperCase().trim() === newName.toUpperCase().trim();
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
      }));
      return maxId;
  }

  getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate().toString();
    const hours = today.getHours().toString();
    const minutes = today.getMinutes().toString();
    const seconds = today.getSeconds().toString();
    const year = today.getFullYear().toString();
    return day + month + year + '_' + hours + minutes + seconds;
  }

  /**
   * Converts a given string to title case string, making first letter of each word uppercase
   * @param str
   * @returns {string | any | void}
   */
  toTitleCase(str)
  {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
  }

  /**
   * Return message for adding a client
   * @param summary
   * @param severity
   * @param detail
   */
  succesAddMessage(summary, severity, detail) {
    const msgs: Message[] = [];
    msgs.push({
      severity: severity,
      summary: summary,
      detail: detail
    });
    return msgs;
  }


  /**
   * Return a formatted success message
   * @param lastname
   * @param firstname
   * @param phone
   * @param msg
   * @returns {Message[]}
   */
  successUpdateMessage(lastname, firstname, phone, msg) {
    const msgs: Message[] = [];
    let msgAux = '';
    if (lastname === undefined || firstname === undefined) {
      msgAux = ' pentru clientul cu numarul de telefon: ' + phone;
    }
    else {
      msgAux = ' pentru clientul: ' + lastname + ' ' + firstname;
    }
    msgs.push({
      severity: 'success',
      summary: msg + msgAux,
      detail: 'Date modificate.'
    });
    return msgs;
  }

  /**
     *
     * @param msg
     */
    errorUpdateMessage(msg) {
      const msgs: Message[] = [];
      msgs.push({
        severity: 'error',
        summary: msg ,
        detail: 'Date modificate.'
      });
      return msgs;
  }
}
