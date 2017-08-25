import { Injectable } from '@angular/core';

export class ClientPF {
  constructor(public id: number, public lastname: string, public firstname: string, public phone: string, public firm: string, public phoneModel: string) { }
}


@Injectable()
export class ClientPFService {

}
