import { Component, OnInit } from '@angular/core';
import {ReportService} from "../../shared/reports/report.service";
import {ReportMoney} from "../../model/ReportMoney";


@Component({
  selector: 'app-reports-show',
  templateUrl: './reports-show.component.html',
  styleUrls: ['./reports-show.component.scss']
})
export class ReportsShowComponent implements OnInit {

  report: ReportMoney = new ReportMoney();
  rangeDates: Date[] = [new Date(), new Date()];
  constructor(private _reportService: ReportService) {
  }
  ngOnInit() {
    this.rangeDates = [new Date(), new Date()];
    this.rangeDates[0].setHours(0,0,0,0);
    this.rangeDates[1].setHours(0,0,0,0);
    let event: Event;
    this.onRangeSelect(event);
  }
  getCheckoutForDate(dates) {
    this.getCashPFGSM(dates);
    this.getCardPFGSM(dates);
    this.getRepaymentPFGSM(dates);
    this.getAdvancePFGSM(dates);
    this.getTotalCash(dates);
    this.getTotalBank(dates);
    this.getTotalIn(dates);
  }
  onRangeSelect(event) {
    if(this.rangeDates[1] !== null && this.rangeDates[0].getTime() <= this.rangeDates[1].getTime()) {
      this.getCheckoutForDate(this.rangeDates)
    }
  }
  getCashPFGSM(dates) {
    let totalCashPF = 0;
    let totalCashGSM = 0;
    let totalPF = 0;
    let totalGSM = 0;
    let clientPFisPayed;
    let clientGSMisPayed;
    this._reportService.getAllPFClients().subscribe(pf => {
      clientPFisPayed = pf.filter(function (client) {
          const clientDate = new Date(+client.addedDate).setHours(0,0,0,0);
          return clientDate >= dates[0].getTime() && clientDate <= dates[1].getTime();
      });
      clientPFisPayed.forEach(item => {
        totalCashPF = +totalCashPF + +item.paymentMethod._advance;

      })
    })
    this._reportService.getAllGSMClients().subscribe(gsm=> {
      clientGSMisPayed = gsm.filter(function (client) {
        const clientDate = new Date(+client.addedDate).setHours(0,0,0,0);
        return clientDate >= dates[0].getTime() && clientDate <= dates[1].getTime();
      });
      clientGSMisPayed.forEach(item => {
        totalCashGSM = totalCashGSM + +item.paymentMethod._advance;

      })
    })
    this._reportService.getAllPFClients().subscribe(pf => {
      clientPFisPayed = pf.filter(function (client) {
        const clientDate = new Date(+client.deliveredDate).setHours(0,0,0,0);
        return clientDate >= dates[0].getTime() && clientDate <= dates[1].getTime() && client.isPayed;
      });
      clientPFisPayed.forEach(item => {
        totalCashPF = +totalCashPF + +item.paymentMethod._cash + +item.paymentMethod._repayment;
        totalPF += +item.paymentMethod._cash + +item.paymentMethod._card + +item.paymentMethod._advance + +item.paymentMethod._collector +
          +item.paymentMethod._repayment;
      })
      totalCashPF = totalCashPF || 0;
      this.report.pfCash = totalCashPF;
      this.report.pfTotal = totalPF || 0;
    })
    this._reportService.getAllGSMClients().subscribe(gsm=> {
      clientGSMisPayed = gsm.filter(function (client) {
        const clientDate = new Date(+client.deliveredDate).setHours(0,0,0,0);
        return clientDate >= dates[0].getTime() && clientDate <= dates[1].getTime() && client.isPayed;
      });
      clientGSMisPayed.forEach(item => {
        totalCashGSM = totalCashGSM + +item.paymentMethod._cash + +item.paymentMethod._repayment;
        totalGSM += +item.paymentMethod._cash + +item.paymentMethod._card + +item.paymentMethod._advance + +item.paymentMethod._collector +
          +item.paymentMethod._repayment;
      })
      totalCashGSM = totalCashGSM || 0;
      this.report.gsmCash = totalCashGSM || 0;
      this.report.gsmTotal = totalGSM || 0;
    })
  }

  getCardPFGSM(dates) {
    let totalCardPF;
    let totalCardGSM ;
    let clientPFisPayed;
    let clientGSMisPayed;

    this._reportService.getAllPFClients().subscribe(pf => {
      totalCardPF = 0;
      clientPFisPayed = pf.filter(function(client) {
        const clientDate = new Date(+client.deliveredDate).setHours(0,0,0,0);
        return client.isPayed &&
          clientDate >= dates[0].getTime() &&
          clientDate <= dates[1].getTime();
      })
      clientPFisPayed.forEach(item => {
        totalCardPF = totalCardPF + +item.paymentMethod._card;
      })
      this.report.pfCard = totalCardPF || 0;
    })
    this._reportService.getAllGSMClients().subscribe(gsm=> {
      totalCardGSM = 0;
      clientGSMisPayed = gsm.filter(function(client) {
        const clientDate = new Date(+client.deliveredDate).setHours(0,0,0,0);
        return client.isPayed &&
          clientDate >= dates[0].getTime() &&
          clientDate <= dates[1].getTime();
      })
      clientGSMisPayed.forEach(item => {
        totalCardGSM = totalCardGSM + +item.paymentMethod._collector;
      })
      this.report.gsmCard = totalCardGSM || 0;
    })
  }

  getRepaymentPFGSM(dates) {
    let totalRepaymentPF;
    let totalRepaymentGSM ;
    let clientPFisPayed;
    let clientGSMisPayed;
    this._reportService.getAllPFClients().subscribe(pf => {
      totalRepaymentPF = 0;
      clientPFisPayed = pf.filter(function(client) {
        const clientDate = new Date(+client.deliveredDate).setHours(0,0,0,0);
        return client.isPayed &&
          clientDate >= dates[0].getTime() &&
          clientDate <= dates[1].getTime();
      })
      clientPFisPayed.forEach(item => {
        totalRepaymentPF = totalRepaymentPF + +item.paymentMethod._repayment;
      })
      this.report.pfRepayment = totalRepaymentPF || 0;
    })
    this._reportService.getAllGSMClients().subscribe(gsm=> {
      totalRepaymentGSM = 0;
      clientGSMisPayed = gsm.filter(function(client) {
        const clientDate = new Date(+client.deliveredDate).setHours(0,0,0,0);
        return client.isPayed &&
          clientDate >= dates[0].getTime() &&
          clientDate <= dates[1].getTime();
      })
      clientGSMisPayed.forEach(item => {
        totalRepaymentGSM = totalRepaymentGSM + +item.paymentMethod._repayment;
      })
      this.report.gsmRepayment = totalRepaymentGSM || 0;
    })
  }

  getAdvancePFGSM(dates) {
    let totalAdvancePF;
    let totalAdvanceGSM ;
    let clientPFisPayed;
    let clientGSMisPayed;
    this._reportService.getAllPFClients().subscribe(pf => {
      totalAdvancePF = 0;
      clientPFisPayed = pf.filter(function(client) {
        const clientDate = new Date(+client.addedDate).setHours(0,0,0,0);
        return clientDate >= dates[0].getTime() && clientDate <= dates[1].getTime();
      })
      clientPFisPayed.forEach(item => {
        totalAdvancePF = totalAdvancePF + +item.paymentMethod._advance;
      })
      this.report.pfAdvance = totalAdvancePF;
    })
    this._reportService.getAllGSMClients().subscribe(gsm=> {
      totalAdvanceGSM = 0;
      clientGSMisPayed = gsm.filter(function(client) {
        const clientDate = new Date(+client.addedDate).setHours(0,0,0,0);
        return clientDate >= dates[0].getTime() && clientDate <= dates[1].getTime();
      })
      clientGSMisPayed.forEach(item => {
        totalAdvanceGSM = totalAdvanceGSM + +item.paymentMethod._advance;
      })
      this.report.gsmAdvance = totalAdvanceGSM;
    })
  }

  getTotalIn(dates) {
    let totalIn;
    let clientPFisPayed;
    let clientGSMisPayed;
    this._reportService.getAllPFClients().subscribe(pf => {
      this._reportService.getAllGSMClients().subscribe(gsm=> {
        totalIn = 0;
        clientPFisPayed = pf.filter(function(client) {
          const clientDate = new Date(+client.addedDate).setHours(0,0,0,0);
          return clientDate >= dates[0].getTime() && clientDate <= dates[1].getTime();
        })
        clientPFisPayed.forEach(item => {
          totalIn = totalIn + +item.paymentMethod._advance;
        })
        clientGSMisPayed = gsm.filter(function(client) {
          const clientDate = new Date(+client.addedDate).setHours(0,0,0,0);
          return clientDate >= dates[0].getTime() && clientDate <= dates[1].getTime();
        })
        clientGSMisPayed.forEach(item => {
          totalIn = totalIn + +item.paymentMethod._advance;
        })
        clientPFisPayed = pf.filter(function(client) {
          const clientDate = new Date(+client.deliveredDate).setHours(0,0,0,0);
          return clientDate >= dates[0].getTime() && clientDate <= dates[1].getTime() && client.isPayed;
        })
        clientPFisPayed.forEach(item => {
          totalIn = totalIn + +item.paymentMethod._cash + +item.paymentMethod._card + +item.paymentMethod._repayment + +item.paymentMethod._collector;
        })
        clientGSMisPayed = gsm.filter(function(client) {
          const clientDate = new Date(+client.deliveredDate).setHours(0,0,0,0);
          return clientDate >= dates[0].getTime() && clientDate <= dates[1].getTime() && client.isPayed;
        })
        clientGSMisPayed.forEach(item => {
          totalIn = totalIn + +item.paymentMethod._cash + +item.paymentMethod._card + +item.paymentMethod._repayment + +item.paymentMethod._collector;
        })
        this.report.totalIn = totalIn;
      })
    })
  }

  getTotalCash(dates) {
    let totalCashPF = 0;
    let totalCashGSM = 0;
    let clientPFisPayed;
    let clientGSMisPayed;
    this._reportService.getAllPFClients().subscribe(pf => {
      this._reportService.getAllGSMClients().subscribe(gsm => {
        //adding advance for given interval
        clientPFisPayed = pf.filter(function(client) {
          const clientDate = new Date(+client.addedDate).setHours(0,0,0,0);
          return clientDate >= dates[0].getTime() && clientDate <= dates[1].getTime();
        })
        clientPFisPayed.forEach(item => {
          totalCashPF = +totalCashPF + +item.paymentMethod._advance;
        })
        clientGSMisPayed = gsm.filter(function(client) {
          const clientDate = new Date(+client.addedDate).setHours(0,0,0,0);
          return clientDate >= dates[0].getTime() && clientDate <= dates[1].getTime();
        })
        clientGSMisPayed.forEach(item => {
          totalCashGSM = +totalCashGSM + +item.paymentMethod._advance;
        })
        //adding rest of payment for given interval
        clientPFisPayed = pf.filter(function(client) {
          const clientDate = new Date(+client.deliveredDate).setHours(0,0,0,0);
          return clientDate >= dates[0].getTime() && clientDate <= dates[1].getTime() && client.isPayed;
        })
        clientPFisPayed.forEach(item => {
          totalCashPF = +totalCashPF + +item.paymentMethod._cash + +item.paymentMethod._repayment;
        })
        clientGSMisPayed = gsm.filter(function(client) {
          const clientDate = new Date(+client.deliveredDate).setHours(0,0,0,0);
          return clientDate >= dates[0].getTime() && clientDate <= dates[1].getTime() && client.isPayed;
        })
        clientGSMisPayed.forEach(item => {
          totalCashGSM = +totalCashGSM + +item.paymentMethod._cash + +item.paymentMethod._repayment;
        })
        this.report.totalCash = totalCashPF + totalCashGSM;
      })
    })
  }

  getTotalBank(dates) {
    let totalBank;
    let clientPFisPayed;
    let clientGSMisPayed;
    this._reportService.getAllPFClients().subscribe(pf => {
      this._reportService.getAllGSMClients().subscribe(gsm => {
        totalBank = 0;
        clientPFisPayed = pf.filter(function(client) {
          const clientDate = new Date(+client.deliveredDate).setHours(0,0,0,0);
          return client.isPayed &&
            clientDate >= dates[0].getTime() &&
            clientDate <= dates[1].getTime();
        })
        clientPFisPayed.forEach(item => {
          totalBank = totalBank + +item.paymentMethod._card + +item.paymentMethod._collector;
        })
        clientGSMisPayed = gsm.filter(function(client) {
          const clientDate = new Date(+client.deliveredDate).setHours(0,0,0,0);
          return client.isPayed &&
            clientDate >= dates[0].getTime() &&
            clientDate <= dates[1].getTime();
        })
        clientGSMisPayed.forEach(item => {
          totalBank = totalBank + +item.paymentMethod._card + +item.paymentMethod._collector;
        })
        this.report.totalBank = totalBank;
      })
    })
  }
}
