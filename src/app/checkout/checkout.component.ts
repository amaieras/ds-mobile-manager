import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {CheckoutService} from './checkout.service';
import {Checkout} from '../model/Checkout';
import {ClientPF} from '../model/ClientPF';
import {ClientGSM} from '../model/ClientGSM';
import {PaymentMethod} from '../model/PaymentMethod';
import {RepairPFDetailService} from '../repairs/repairPF/repair-pf-detail.service';
import {Message} from 'primeng/api';
import {RepairGSMDetailService} from '../repairs/repairGSM/repair-gsm-detail.service';
import {UtilService} from '../utils/util.service';
import {PhoneListService} from '../clients/clientPF/phone-list/phone-list.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {

  checkout: Checkout[] = [new Checkout(0, 0, 0, 0)];
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
  msgs: Message[] = [];
  brandList: any[] = [];
  modelList: any[] = [];
  phoneBrandsArray: any = [];
  phoneModelsArray: any = [];
  selectedModel = '';
  selectedBrand = '';
  allPFRepairs: ClientPF[];
  allGSMRepairs: ClientGSM[];

  shops = new FormControl();
  shopList: any = [{key: 'shop1', value: 'Shop 1 - Galeria 1 (PF)'}, {key: 'shop2', value: 'Refurbish center (GSM)'}];
  selectedShop = ['shop1', 'shop2'];

  constructor(private _checkoutService: CheckoutService, private cdr: ChangeDetectorRef,
              private _repairPFService: RepairPFDetailService, private _repairGSMService: RepairGSMDetailService,
              private _utilService: UtilService, private _phoneListService: PhoneListService) {
    this.currDate = new Date();
  }
  ngOnInit() {
    this.clientPF.paymentMethod = new PaymentMethod(0, 0, 0, 0, 0);
    this.clientGSM.paymentMethod = new PaymentMethod(0, 0, 0, 0, 0);
    this.testingValues = [{label: 'DA', value: 'DA'}, {label: 'NU', value: 'NU'}];
    this.methodsOfPayment = [{label: 'Nu', value: 'nu'}, {label: 'Cont Curent', value: 'cont'}, {label: 'Ramburs', value: 'ramburs'}];

    this.getCheckoutForDate(new Date());
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

  getCheckoutForShop() {
      this.getTotalClientsPerDay(this.currDate);
      this.getTotalIsRepairedPerDay(this.currDate);
      this.getTotalIsRemainingPerDay(this.currDate);
      this.getTotalIsRemaining(this.currDate);
      this.getTotalReceipts(this.currDate);
  }


  /**
   * Adds to the total sum also the advance payments made in the same selected date.
   * We need 2 filters on added and delivered date.
   * @param event
   */
  getTotalReceipts(event) {
    let totalCash = 0;
    let totalCard = 0;
    let total = 0;
    const pfClients =  this._checkoutService.getClientsPFCurrDay();
    const gsmClients = this._checkoutService.getClientsGSMCurrDay();
    if (this.selectedShop.length === 1) {
      if (this.selectedShop[0] === 'shop1') {
        pfClients.subscribe(pf => {
          pf.filter(client => {
              const clientDate = new Date(+client.addedDate);
              return clientDate.toDateString() === event.toDateString();
          }).forEach(c => {
              totalCash = +totalCash + +c.paymentMethod._advance;
              total = total + +c.paymentMethod._advance ;
          });
          pf.filter(client => {
              const clientDate = new Date(+client.deliveredDate);
              return clientDate.toDateString() === event.toDateString() && client.isPayed;
          }).forEach(c => {
            totalCash = +totalCash + +c.paymentMethod._cash + +c.paymentMethod._repayment;
            totalCard = totalCard + +c.paymentMethod._card + +c.paymentMethod._collector;
            total = total + +c.paymentMethod._cash + +c.paymentMethod._card + +c.paymentMethod._repayment + +c.paymentMethod._collector;
          });
          this.totalCash = totalCash || 0;
          this.totalCard = totalCard || 0;

          this.total = total || 0;
        });
      } else if (this.selectedShop[0] === 'shop2') {
        gsmClients.subscribe(gsm => {
          gsm.filter(client => {
            const clientDate = new Date(+client.addedDate);
            return clientDate.toDateString() === event.toDateString();
          }).forEach(c => {
            totalCash = +totalCash + +c.paymentMethod._advance;
            total = total + +c.paymentMethod._advance ;
          });
          gsm.filter(client => {
            const clientDate = new Date(+client.deliveredDate);
            return clientDate.toDateString() === event.toDateString() && client.isPayed;
          }).forEach(c => {
            totalCash = +totalCash + +c.paymentMethod._cash + +c.paymentMethod._repayment;
            totalCard = totalCard + +c.paymentMethod._card + +c.paymentMethod._collector;
            total = total + +c.paymentMethod._cash + +c.paymentMethod._card + +c.paymentMethod._repayment + +c.paymentMethod._collector;
          });
          this.totalCash = totalCash || 0;
          this.totalCard = totalCard || 0;

          this.total = total || 0;
        });
      }
    }
    else if (this.selectedShop.length > 1) {
      pfClients.subscribe(pf => {
        gsmClients.subscribe(gsm => {
          let totalCash = 0;
          let totalCard = 0;
          let total = 0;

          let clientPFIsRepaired;
          let clientGSMIsRepaired;
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
    } else {
      this.totalCash = 0;
      this.totalCard = 0;

      this.total = 0;
    }
  }

  /**
   * Counts the number of clients added in selected date and for the selected shop/s
   * @param event
   */
  getTotalClientsPerDay(event) {
    const pfClients =  this._checkoutService.getClientsPFCurrDay();
    const gsmClients = this._checkoutService.getClientsGSMCurrDay();

    if (this.selectedShop.length === 1) {
      if (this.selectedShop[0] === 'shop1') {
        pfClients.subscribe(pf => {
          this.totalClientsPerDay = pf.filter(function (client) {
            const clientDate = new Date(+client.addedDate);
            return clientDate.toDateString() === event.toDateString();
          }).length;
        });
      }
      else if (this.selectedShop[0] === 'shop2') {
        gsmClients.subscribe(gsm => {
          this.totalClientsPerDay = gsm.filter(function (client) {
            const clientDate = new Date(+client.addedDate);
            return clientDate.toDateString() === event.toDateString();
          }).length;
        });
      }
    } else if (this.selectedShop.length > 1) {
      //TODO remove nested subscribe - when using merge the total amount is incremented for every client add/change
      pfClients.subscribe(pf => {
        gsmClients.subscribe(gsm => {
          this.totalClientsPerDay = 0;
          let totalPF = 0;
          let totalGSM = 0;
          totalPF = pf.filter(client => {
            const clientDate = new Date(+client.addedDate);
            return clientDate.toDateString() === event.toDateString();
          }).length;

          totalGSM = gsm.filter(client => {
            const clientDate = new Date(+client.addedDate);
            return clientDate.toDateString() === event.toDateString();
          }).length;

          this.totalClientsPerDay = totalPF + totalGSM;
        });
      });
    }
    else {
      this.totalClientsPerDay = 0;
    }
  }

  /**
   * Counts the number of clients that have finished repairs and payed on the selected date and for the selected shop
   * @param event
   */
  getTotalIsRepairedPerDay(event) {
    const pfClients =  this._checkoutService.getClientsPFCurrDay();
    const gsmClients = this._checkoutService.getClientsGSMCurrDay();
    if (this.selectedShop.length === 1) {
      if (this.selectedShop[0] === 'shop1') {
        pfClients.subscribe(pf => {
          this.totalIsRepairedPerDay = pf.filter(client => {
            const clientDate = new Date(+client.deliveredDate);
            return clientDate.toDateString() === event.toDateString()  && client.isPayed;
          }).length;
        });
      }
      else if (this.selectedShop[0] === 'shop2') {
        gsmClients.subscribe(gsm => {
          this.totalIsRepairedPerDay = gsm.filter(client => {
            const clientDate = new Date(+client.deliveredDate);
            return clientDate.toDateString() === event.toDateString()  && client.isPayed;
          }).length;
        });
      }
    }
    else if (this.selectedShop.length > 1) {
      this.totalIsRepairedPerDay = 0;
      let totalPF = 0;
      let totalGSM = 0;
      pfClients.subscribe(pf => {
        gsmClients.subscribe(gsm => {
          totalPF = pf.filter(client => {
                const clientDate = new Date(+client.deliveredDate);
                return clientDate.toDateString() === event.toDateString() && client.isPayed;
              }).length;
          totalGSM = gsm.filter(client => {
                const clientDate = new Date(+client.deliveredDate);
                return clientDate.toDateString() === event.toDateString() && client.isPayed;
              }).length;

            this.totalIsRepairedPerDay = totalPF + totalGSM;
        });
      });
    }
    else {
      this.totalIsRepairedPerDay = 0;
    }

  }

  /**
   * Counts the number of clients that were introduced on the selected date and have not payed(repair is not finished)
   * @param event
   */
  getTotalIsRemainingPerDay(event) {
    const pfClients =  this._checkoutService.getClientsPFCurrDay();
    const gsmClients = this._checkoutService.getClientsGSMCurrDay();
    if (this.selectedShop.length === 1) {
      if (this.selectedShop[0] === 'shop1') {
        pfClients.subscribe(pf => {
          this.totalIsRemainingPerDay = pf.filter(client => {
            const clientDate = new Date(+client.addedDate);
            return clientDate.toDateString() === event.toDateString()  && !client.isPayed;
          }).length;
        });
      } else if (this.selectedShop[0] === 'shop2') {
        gsmClients.subscribe(gsm => {
          this.totalIsRemainingPerDay = gsm.filter(client => {
            const clientDate = new Date(+client.addedDate);
            return clientDate.toDateString() === event.toDateString()  && !client.isPayed;
          }).length;
        });
      }
    } else if (this.selectedShop.length > 1) {
      let totalPF = 0;
      let totalGSM = 0;
      pfClients.subscribe(pf => {
        gsmClients.subscribe(gsm => {
          totalPF = pf.filter(client => {
                const clientDate = new Date(+client.addedDate);
                return clientDate.toDateString() === event.toDateString() && !client.isPayed;
              }).length;
          totalGSM = gsm.filter(client => {
            const clientDate = new Date(+client.addedDate);
            return clientDate.toDateString() === event.toDateString() && !client.isPayed;
          }).length;

          this.totalIsRemainingPerDay = totalPF + totalGSM;
        });
      });
    } else {
      this.totalIsRemainingPerDay = 0;
    }
  }

  /**
   * Counts the number of clients that need to pay/repairs need to be done
   * @param event
   */
  getTotalIsRemaining(event) {
    const pfClients =  this._checkoutService.getClientsPFCurrDay();
    const gsmClients = this._checkoutService.getClientsGSMCurrDay();
    if (this.selectedShop.length === 1) {
      if (this.selectedShop[0] === 'shop1') {
        pfClients.subscribe(pf => {
          this.totalIsRemaining = pf.filter(client => {
            return !client.isPayed;
          }).length;
        });
      } else if (this.selectedShop[0] === 'shop2') {
        gsmClients.subscribe(gsm => {
          this.totalIsRemaining = gsm.filter(client => {
            return !client.isPayed;
          }).length;
        });
      }
    } else if (this.selectedShop.length > 1) {
      this.totalIsRemaining = 0;
      let totalPF = 0;
      let totalGSM = 0;
      pfClients.subscribe(pf => {
        gsmClients.subscribe(gsm => {
          this.allPFRepairs = pf.filter(client => {
                return !client.isPayed;
              });
          totalPF = this.allPFRepairs.length;
          this.allGSMRepairs = gsm.filter(client => {
            return !client.isPayed;
          });
          totalGSM = this.allGSMRepairs.length;
          this.totalIsRemaining = totalPF + totalGSM;

        });
      });
    } else {
      this.totalIsRemaining = 0;
    }

  }

  addedClientsByDate(showType) {
    const that = this;
    this.clientsPFPerDay = [];
    this.clientsGSMPerDay = [];
    this._checkoutService.getClientsPFCurrDay().subscribe(pf => {
      this._checkoutService.getClientsGSMCurrDay().subscribe(gsm => {
        if (showType === 'totalAddedPerDay') {
          if (this.selectedShop.length === 1) {
            if (this.selectedShop[0] === 'shop1') {
              this.clientsPFPerDay = pf.filter(client => {
                const clientDate = new Date(+client.addedDate);
                return clientDate.toDateString() === that.currDate.toDateString();
              });
            } else if (this.selectedShop[0] === 'shop2') {
              this.clientsGSMPerDay = gsm.filter(client => {
                const clientDate = new Date(+client.addedDate);
                return clientDate.toDateString() === that.currDate.toDateString();
              });
            }
          } else {
            this.clientsPFPerDay = pf.filter(client => {
              const clientDate = new Date(+client.addedDate);
              return clientDate.toDateString() === that.currDate.toDateString();
            });
            this.clientsGSMPerDay = gsm.filter(client => {
              const clientDate = new Date(+client.addedDate);
              return clientDate.toDateString() === that.currDate.toDateString();
            });
          }


        } else if (showType === 'totalMoneyPerDay') {
          if (this.selectedShop.length === 1) {
            if (this.selectedShop[0] === 'shop1') {
              this.clientsPFPerDay = pf.filter(client => {
                const clientDate = new Date(+client.deliveredDate);
                return clientDate.toDateString() === that.currDate.toDateString() && client.isPayed;
              });
            } else if (this.selectedShop[0] === 'shop2')  {
              this.clientsGSMPerDay = gsm.filter(client => {
                const clientDate = new Date(+client.deliveredDate);
                return clientDate.toDateString() === that.currDate.toDateString()  && client.isPayed;
              });
            }
          } else {
            this.clientsPFPerDay = pf.filter(client => {
              const clientDate = new Date(+client.deliveredDate);
              return clientDate.toDateString() === that.currDate.toDateString() && client.isPayed;
            });
            this.clientsGSMPerDay = gsm.filter(client => {
              const clientDate = new Date(+client.deliveredDate);
              return clientDate.toDateString() === that.currDate.toDateString()  && client.isPayed;
            });
          }
        } else if (showType === 'remainingRepairsPerDay') {
          if (this.selectedShop.length === 1) {
            if (this.selectedShop[0] === 'shop1') {
              this.clientsPFPerDay = pf.filter(client => {
                const clientDate = new Date(+client.addedDate);
                return clientDate.toDateString() === that.currDate.toDateString()  && !client.isPayed;
              });
            } else if (this.selectedShop[0] === 'shop2')  {
              this.clientsGSMPerDay = gsm.filter(client => {
                const clientDate = new Date(+client.addedDate);
                return clientDate.toDateString() === that.currDate.toDateString()  && !client.isPayed;
              });
            }
          } else {
            this.clientsPFPerDay = pf.filter(client => {
              const clientDate = new Date(+client.addedDate);
              return clientDate.toDateString() === that.currDate.toDateString()  && !client.isPayed;
            });
            this.clientsGSMPerDay = gsm.filter(client => {
              const clientDate = new Date(+client.addedDate);
              return clientDate.toDateString() === that.currDate.toDateString()  && !client.isPayed;
            });
          }
        } else if (showType === 'remainingRepairs') {
          if (this.selectedShop.length === 1) {
            if (this.selectedShop[0] === 'shop1') {
              this.clientsPFPerDay = pf.filter(client => {
                return !client.isPayed;
              });
            } else if (this.selectedShop[0] === 'shop2')  {
              this.clientsGSMPerDay = gsm.filter(client => {
                return !client.isPayed;
              });
            }
          } else {
            this.clientsPFPerDay = pf.filter(client => {
              return !client.isPayed;
            });
            this.clientsGSMPerDay = gsm.filter(client => {
              return !client.isPayed;
            });
          }
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
    const clientGSM = new ClientGSM();
    for (const prop in c) {
      clientGSM[prop] = c[prop];
    }
    return clientGSM;
  }
  cloneClient(c: ClientPF): ClientPF {
    const clientPF = new ClientPF();
    for (const prop in c) {
      clientPF[prop] = c[prop];
    }
    return clientPF;
  }

  savePF() {
    this.updatePFField(this.clientPF);
    this.displayDialogPF = false;
    this.getCheckoutForShop();
  }
  saveGSM() {
    this.updateGSMField(this.clientGSM);
    this.displayDialogGSM = false;
    this.getCheckoutForShop();
  }
  cancel() {
    this.displayDialogPF = false;
    this.displayDialogGSM = false;
  }
  updatePFField(clientPF) {
    const clientKey = clientPF.$key;
    this.updateCheckedItem(clientPF);
    delete clientPF.$key;
    // TODO - update full array not just first value
    clientPF.phoneList[0].phoneBrand = this.selectedBrand;
    clientPF.phoneList[0].phoneModel = this.selectedModel;
    this._repairPFService.updateItem(clientKey, clientPF);
    this.msgs = this._utilService.successUpdateMessage(clientPF.lastname, '', clientPF.phone, 'Valoare modificata ');
  }
  updateGSMField(clientGSM) {
    const clientKey = clientGSM.$key;
    this.updateCheckedItem(clientGSM);
    delete clientGSM.$key;
    this._repairGSMService.updateItem(clientKey, clientGSM);
    this.msgs = this._utilService.successUpdateMessage(clientGSM.lastname, '', clientGSM.phone, 'Valoare modificata ');
  }

  /**
   * Updates pf or gsm client based on the existance of city property, only gsm has city
   * @param row
   */
  updateCheckedItem(row) {
    if (row.city) {
      this._repairGSMService.updateItem(row.$key, {isPayed: row.isPayed});


      if (row.isPayed) {
        const date = new Date().getTime().toString();
        this._repairGSMService.updateItem(row.$key, {deliveredDate: date});
      }
    } else {
      this._repairPFService.updateItem(row.$key, {isPayed: row.isPayed});

      if (row.isPayed) {
        const date = new Date().getTime().toString();
        this._repairPFService.updateItem(row.$key, {deliveredDate: date});
      }
    }

  }
  checkPaymentIsNo(client, type) {
    if (type === 'priceOffer') {
      client[type] = isNaN(client[type]) ||
      String(client[type]).trim().length === 0 ? 0 : +client[type];
    } else {
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
      // Remove 'Altele' as on modify the user can't add new brand
      this.brandList.shift();
    });
    this._phoneListService.getModelList().subscribe(phoneBrands => {
      this.phoneModelsArray = [];
      phoneBrands.forEach(snapshot => {
        this.phoneModelsArray.push({label: snapshot.name, value: snapshot.name.toLowerCase(), phoneId: snapshot.phoneId.toLowerCase()});
        this.modelList = this.phoneModelsArray;
      });
      this.phoneModelsArray = this.phoneModelsArray.filter((item) => item.phoneId === 'iphone' || item.phoneId === 'altele');
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
    });
  }
  setBrandModel() {
    // TODO - update full array not just first value
    this.selectedBrand = this.clientPF.phoneList[0].phoneBrand.toLowerCase();
    this.selectedModel = this.clientPF.phoneList[0].phoneModel.toLowerCase();
  }


  markAsDone() {
    const keyPf = 'clients/pf';
    const keyGsm = 'clients/gsm';
    const keyAboutUs = 'aboutus-list';
    const dataObj = {};
    this._checkoutService.getAllData(keyPf).subscribe(clientsPf => {
        const clientsPFLastYear = clientsPf.filter(pf => {
          return new Date(+pf.addedDate).getFullYear() === 2020;
        }).map(c => {
          c.isRepaired = true;
          c.isPayed = true;
          c.deliveredDate = c.addedDate;
          return c;
        });

        let allPFClients = clientsPf.filter(cf => {
          return new Date(+cf.addedDate).getFullYear() !== 2020;
        });

        allPFClients = allPFClients.concat(clientsPFLastYear);

        localStorage.clientPF = JSON.stringify(dataObj);
    });
    this._checkoutService.getAllData(keyGsm).subscribe(clientsGsm => {
      const clientsGsmLastYear = clientsGsm.filter(pf => {
        return new Date(+pf.addedDate).getFullYear() === 2020;
      }).map(c => {
        c.isRepaired = true;
        c.isPayed = true;
        c.deliveredDate = c.addedDate;
        return c;
      });
      clientsGsmLastYear.forEach(c => {
        dataObj[c['$key']] = c;
        delete dataObj[c['$key']]['$key'];
      });
      let allGSMClients = clientsGsm.filter(cf => {
        return new Date(+cf.addedDate).getFullYear() !== 2020;
      });

      allGSMClients = allGSMClients.concat(clientsGsmLastYear);

      allGSMClients.forEach(c => {
        dataObj[c['$key']] = c;
        delete dataObj[c['$key']]['$key'];
      });
      localStorage.clientGSM = JSON.stringify(dataObj);

    });
  }
}
