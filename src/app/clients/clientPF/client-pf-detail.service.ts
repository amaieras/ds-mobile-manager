import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {UtilService} from '../../utils/util.service';
import {ClientPF} from '../../model/ClientPF';



@Injectable()
export class ClientPFService {
  clientsPF: AngularFireList<ClientPF> = null;

  constructor(private db: AngularFireDatabase, private _utilService: UtilService) {
    this.clientsPF = db.list('/clients/pf');
  }


  public addPFClient(clientPF: ClientPF): void {
    this.clientsPF.push(clientPF);
  }

}


