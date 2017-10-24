import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class DataSharedService {
  private messageSource = new BehaviorSubject<string>("0");
  currentPartId = this.messageSource.asObservable();

  constructor() { }

  changePartId(id: string) {
    this.messageSource.next(id);
  }
}
