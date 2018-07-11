import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {CheckoutService} from "./checkout.service";
import {Checkout} from "app/main/apps/checkout/checkout.model";
import {ClientPF} from "app/main/apps/clients/client-pf/client-pf.model";
import {ClientGSM} from "app/main/apps/clients/client-gsm/client-gsm.model";
import {PaymentMethod} from "app/model/PaymentMethod";
import {RepairPFDetailService} from "app/main/apps/repairs/repairPF/repair-pf-detail.service";
import {Message} from "primeng/api";
import {RepairGSMDetailService} from "app/main/apps/repairs/repairGSM/repair-gsm-detail.service";
import {UtilService} from "app/utils/util.service";
import {PhoneListService} from "app/main/apps/clients/client-pf/phone-pf-list/phone-list.service";

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {

  checkout: Checkout[] = [new Checkout(0,0,0,0)];
  currDate = new Date();
  //total
  totalClientsPerDay = 0;
  totalIsRepairedPerDay = 0;
  totalIsRemainingPerDay = 0;
  totalIsRemaining = 0;
  totalCash = 0;
  totalCard = 0;
  total = 0;
  displayDialogPF: boolean;
  displayDialogGSM: boolean;
  testingValues: any[];
  clientPF: ClientPF = new ClientPF();
  clientGSM: ClientGSM = new ClientGSM();
  clientsPFPerDay: ClientPF[] = [];
  clientsGSMPerDay: ClientGSM[] = [];
  methodsOfPayment: any[];
  msgs:Message[] = [];
  brandList: any[] = [];
  modelList: any[] = [];
  phoneBrandsArray: any = [];
  phoneModelsArray: any = [];
  selectedModel = "";
  selectedBrand = "";

  constructor(private _checkoutService: CheckoutService, private cdr: ChangeDetectorRef,
              private _repairPFService: RepairPFDetailService, private _repairGSMService: RepairGSMDetailService,
              private _utilService: UtilService, private _phoneListService: PhoneListService) {
    this.currDate = new Date();

  }
  ngOnInit() {
    this.clientPF.paymentMethod = new PaymentMethod(0,0,0,0,0);
    this.clientGSM.paymentMethod = new PaymentMethod(0,0,0,0,0);
    this.testingValues = [{label: 'DA', value: 'DA'},{label: 'NU', value: 'NU'}];
    this.methodsOfPayment = [{label: 'Nu', value: 'nu'},{label: 'Cont Curent', value: 'cont'},{label: 'Ramburs', value: 'ramburs'}];
    this.getTotalClientsPerDay(new Date());
    this.getTotalIsRepairedPerDay(new Date());
    this.getTotalIsRemainingPerDay(new Date());
    this.getTotalIsRemaining(new Date());
    this.getTotalReceipts(new Date());


    this.initBrandModelList();

  }
  getCheckoutForDate(event) {
    this.currDate = event;
    this.getTotalClientsPerDay(event);
    this.getTotalIsRepairedPerDay(event);
    this.getTotalIsRemainingPerDay(event);
    this.getTotalIsRemaining(event);
    this.getTotalReceipts(event);
  }


  getTotalReceipts(event) {
    let clientPFIsRepaired;
    let clientGSMIsRepaired;
    this._checkoutService.getClientsPFCurrDay().subscribe(pf => {
      this._checkoutService.getClientsGSMCurrDay().subscribe(gsm => {
          let totalCash = 0;
          let totalCard = 0;
          let total = 0;
          clientPFIsRepaired = pf.filter(function (client) {
            const clientDate = new Date(+client.addedDate);
            return clientDate.toDateString() === event.toDateString();
          });
          clientGSMIsRepaired = gsm.filter(function (client) {
            const clientDate = new Date(+client.addedDate);
            return clientDate.toDateString() === event.toDateString();
          });
          clientPFIsRepaired.forEach(c => {
            totalCash = +totalCash + +c.paymentMethod._advance;
            total = total + +c.paymentMethod._advance ;
          });

          clientGSMIsRepaired.forEach(c => {
            totalCash = +totalCash +  +c.paymentMethod._advance;
            total = total + +c.paymentMethod._advance;
          });

          clientPFIsRepaired = pf.filter(function (client) {
            const clientDate = new Date(+client.deliveredDate);
            return clientDate.toDateString() === event.toDateString() && client.isPayed;
          });
          clientGSMIsRepaired = gsm.filter(function (client) {
            const clientDate = new Date(+client.deliveredDate);
            return clientDate.toDateString() === event.toDateString() && client.isPayed;
          });

          clientPFIsRepaired.forEach(c => {
            totalCash = +totalCash + +c.paymentMethod._cash + +c.paymentMethod._repayment;
            totalCard = totalCard + +c.paymentMethod._card + +c.paymentMethod._collector;
            total = total + +c.paymentMethod._cash + +c.paymentMethod._card + +c.paymentMethod._repayment + +c.paymentMethod._collector;
          });
          clientGSMIsRepaired.forEach(c => {
            totalCash = +totalCash + +c.paymentMethod._cash + +c.paymentMethod._repayment;
            totalCard = totalCard + +c.paymentMethod._card + +c.paymentMethod._collector;
            total = total + +c.paymentMethod._cash + +c.paymentMethod._card + +c.paymentMethod._repayment + +c.paymentMethod._collector;
          });
          this.totalCash = totalCash || 0;
          this.totalCard = totalCard || 0;

          this.total = total || 0;
      });
    });
  }

  getTotalClientsPerDay(event) {
    let clientPFPerDay;
    let clientGSMPerDay;
    this._checkoutService.getClientsPFCurrDay().subscribe(pf => {
      this._checkoutService.getClientsGSMCurrDay().subscribe(gsm => {
          clientPFPerDay = pf.filter(function (client) {
            const clientDate = new Date(+client.addedDate);
            return clientDate.toDateString() === event.toDateString();
          });
          clientGSMPerDay = gsm.filter(function (client) {
            const clientDate = new Date(+client.addedDate);
            return clientDate.toDateString() === event.toDateString();
          });
          this.totalClientsPerDay = clientPFPerDay.length + clientGSMPerDay.length;
        });
      });
  }


  getTotalIsRepairedPerDay(event) {
    let clientPFIsRepairedPerDay;
    let clientGSMIsRepairedPerDay;
    this._checkoutService.getClientsPFCurrDay().subscribe(pf => {
      this._checkoutService.getClientsGSMCurrDay().subscribe(gsm => {
          clientPFIsRepairedPerDay = pf.filter(function (client) {
            const clientDate = new Date(+client.deliveredDate);
            return clientDate.toDateString() === event.toDateString()  && client.isPayed;
          }).length;
          clientGSMIsRepairedPerDay = gsm.filter(function (client) {
            const clientDate = new Date(+client.deliveredDate);
            return clientDate.toDateString() === event.toDateString()  && client.isPayed;
          }).length;
          this.totalIsRepairedPerDay = clientPFIsRepairedPerDay + clientGSMIsRepairedPerDay ;
      });
    });
  }

  getTotalIsRemainingPerDay(event) {
    let clientPFIsRemainingPerDay;
    let clientGSMIsRemainingPerDay;
    this._checkoutService.getClientsPFCurrDay().subscribe(pf => {
      this._checkoutService.getClientsGSMCurrDay().subscribe(gsm => {
          clientPFIsRemainingPerDay = pf.filter(function (client) {
            const clientDate = new Date(+client.addedDate);
            return clientDate.toDateString() === event.toDateString()  && !client.isPayed;
          }).length;
          clientGSMIsRemainingPerDay = gsm.filter(function (client) {
            const clientDate = new Date(+client.addedDate);
            return clientDate.toDateString() === event.toDateString()  && !client.isPayed;
          }).length;
          this.totalIsRemainingPerDay = clientPFIsRemainingPerDay + clientGSMIsRemainingPerDay ;
      });
    });
  }

  getTotalIsRemaining(event) {
    let clientPFIsRemaining;
    let clientGSMIsRemaining;
    this._checkoutService.getClientsPFCurrDay().subscribe(pf => {
      this._checkoutService.getClientsGSMCurrDay().subscribe(gsm => {
          clientPFIsRemaining = pf.filter(function (client) {
            return !client.isPayed;
          }).length;
          clientGSMIsRemaining = gsm.filter(function (client) {
            return !client.isPayed;
          }).length;
          this.totalIsRemaining = clientPFIsRemaining + clientGSMIsRemaining;
        });
    });
  }

  addedClientsByDate(showType) {
    const that = this;
    this._checkoutService.getClientsPFCurrDay().subscribe(pf => {
      this._checkoutService.getClientsGSMCurrDay().subscribe(gsm => {
        if(showType === 'totalAddedPerDay') {
          this.clientsPFPerDay = pf.filter(function (client) {
            const clientDate = new Date(+client.addedDate);
            return clientDate.toDateString() === that.currDate.toDateString();
          });
          this.clientsGSMPerDay = gsm.filter(function (client) {
            const clientDate = new Date(+client.addedDate);
            return clientDate.toDateString() === that.currDate.toDateString();
          });
        }
        else if(showType === 'totalMoneyPerDay') {
          this.clientsPFPerDay = pf.filter(function (client) {
            const clientDate = new Date(+client.deliveredDate);
            return clientDate.toDateString() === that.currDate.toDateString() && client.isPayed;
          });
          this.clientsGSMPerDay = gsm.filter(function (client) {
            const clientDate = new Date(+client.deliveredDate);
            return clientDate.toDateString() === that.currDate.toDateString()  && client.isPayed;
          });
        }
        else if(showType === 'remainingRepairsPerDay') {
          this.clientsPFPerDay = pf.filter(function (client) {
            const clientDate = new Date(+client.addedDate);
            return clientDate.toDateString() === that.currDate.toDateString()  && !client.isPayed;
          });
          this.clientsGSMPerDay = gsm.filter(function (client) {
            const clientDate = new Date(+client.addedDate);
            return clientDate.toDateString() === that.currDate.toDateString()  && !client.isPayed;
          });
        }
        else if(showType === 'remainingRepairs') {
          this.clientsPFPerDay = pf.filter(function (client) {
            return !client.isPayed;
          });
          this.clientsGSMPerDay = gsm.filter(function (client) {
            return !client.isPayed;
          });
        }
      });
    });
  }
  onRowSelect(event, client) {
    this.clientPF = this.cloneClient(client);
    this.displayDialogPF = true;
    this.setBrandModel();
    this.onBrandSelect();
    this.cdr.detectChanges();
  }
  onRowSelectGSM(event, client) {
    this.clientGSM = this.cloneClientGSM(client);
    this.displayDialogGSM = true;
    this.cdr.detectChanges();
  }
  cloneClientGSM(c: ClientGSM): ClientGSM {
    let clientGSM = new ClientGSM();
    for(let prop in c) {
      clientGSM[prop] = c[prop];
    }
    return clientGSM;
  }
  cloneClient(c: ClientPF): ClientPF {
    let clientPF = new ClientPF();
    for(let prop in c) {
      clientPF[prop] = c[prop];
    }
    return clientPF;
  }

  savePF() {
    this.updatePFField(this.clientPF);
    this.displayDialogPF = false;
  }
  saveGSM() {
    this.updateGSMField(this.clientGSM);
    this.displayDialogGSM = false;
  }
  cancel() {
    this.displayDialogPF = false;
    this.displayDialogGSM = false;
  }
  updatePFField(clientPF) {
    const clientKey = clientPF.$key;
    this.updateCheckedItem(clientPF);
    delete clientPF.$key;
    //TODO - update full array not just first value
    clientPF.phoneList[0].phoneBrand = this.selectedBrand;
    clientPF.phoneList[0].phoneModel = this.selectedModel;
    this._repairPFService.updateItem(clientKey, clientPF);
    this.msgs = this._utilService.successMessage(clientPF.lastname, "", clientPF.phone,'Valoare');
  }
  updateGSMField(clientGSM) {
    const clientKey = clientGSM.$key;
    this.updateCheckedItem(clientGSM);
    delete clientGSM.$key;
    this._repairGSMService.updateItem(clientKey, clientGSM);
    this.msgs = this._utilService.successMessage(clientGSM.lastname, "", clientGSM.phone,'Valoare');
  }

  /**
   * Updates pf or gsm client based on the existance of city property, only gsm has city
   * @param row
   */
  updateCheckedItem(row) {
    if(row.city) {
      this._repairGSMService.updateItem(row.$key, {isPayed: row.isPayed});


      if(row.isPayed) {
        let date = new Date().getTime().toString();
        this._repairGSMService.updateItem(row.$key, {deliveredDate: date});
      }
    } else {
      this._repairPFService.updateItem(row.$key, {isPayed: row.isPayed});

      if(row.isPayed) {
        let date = new Date().getTime().toString();
        this._repairPFService.updateItem(row.$key, {deliveredDate: date});
      }
    }

  }
  checkPaymentIsNo(client, type) {
    if(type === 'priceOffer') {
      client[type] = isNaN(client[type]) ||
      String(client[type]).trim().length === 0 ? 0 : +client[type];
    }
    else {
      client.paymentMethod[type] = isNaN(client.paymentMethod[type]) ||
      String(client.paymentMethod[type]).trim().length === 0 ? 0 : +client.paymentMethod[type];
    }
  }

  initBrandModelList() {
    this._phoneListService.getBrandList().subscribe(phoneModels => {
      this.phoneBrandsArray = [];
      phoneModels.forEach(snapshot => {
        this.brandList.push({label: snapshot.name, value: snapshot.name.toLowerCase()});
      });
      //Remove 'Altele' as on modify the user can't add new brand
      this.brandList.shift();
    });
    this._phoneListService.getModelList().subscribe(phoneBrands => {
      this.phoneModelsArray = [];
      phoneBrands.forEach(snapshot => {
        this.phoneModelsArray.push({label: snapshot.name, value: snapshot.name.toLowerCase(), phoneId: snapshot.phoneId.toLowerCase()});
        this.modelList = this.phoneModelsArray;
      });
      this.phoneModelsArray = this.phoneModelsArray.filter((item) => item.phoneId === "iphone" || item.phoneId === 'altele');
    });
  }

  onBrandSelect() {
    this._phoneListService.getModelList().subscribe(phoneBrands => {
        this.phoneModelsArray = [];
        phoneBrands.forEach(snapshot => {
          this.phoneModelsArray.push({label: snapshot.name, value: snapshot.name.toLowerCase(), phoneId: snapshot.phoneId});
        });
        this.phoneModelsArray = this.phoneModelsArray.filter((item) => item.phoneId.toLowerCase() === this.selectedBrand.toLowerCase());
        this.modelList = this.phoneModelsArray;
    })
  }
  setBrandModel() {
    //TODO - update full array not just first value
    this.selectedBrand = this.clientPF.phoneList[0].phoneBrand.toLowerCase();
    this.selectedModel = this.clientPF.phoneList[0].phoneModel.toLowerCase();
  }
}
