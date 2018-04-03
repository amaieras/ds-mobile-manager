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

    this.getCheckoutForDate(this.rangeDates);
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
    let totalCashPF;
    let totalCashGSM ;
    let clientPFisPayed;
    let clientGSMisPayed;
    this._reportService.getAllPFClients().subscribe(pf => {
      totalCashPF = 0;
      clientPFisPayed = pf.filter(function (client) {
          const clientDate = new Date(+client.deliveredDate).setHours(0,0,0,0);
          return client.isPayed &&
            clientDate >= dates[0].getTime() &&
            clientDate <= dates[1].getTime();
      });
      clientPFisPayed.forEach(item => {
        totalCashPF = totalCashPF + +item.paymentMethod._cash + +item.paymentMethod._repayment + +item.paymentMethod._advance;
      })
      this.report.pfCash = totalCashPF || 0;
    })
    this._reportService.getAllGSMClients().subscribe(gsm=> {
      totalCashGSM = 0;
      clientGSMisPayed = gsm.filter(function (client) {
        const clientDate = new Date(+client.deliveredDate).setHours(0,0,0,0);
        return client.isPayed &&
          clientDate >= dates[0].getTime() &&
          clientDate <= dates[1].getTime();
      });
      clientGSMisPayed.forEach(item => {
        totalCashGSM = totalCashGSM + +item.paymentMethod._cash + +item.paymentMethod._repayment + +item.paymentMethod._advance;
      })
      this.report.gsmCash = totalCashGSM || 0;
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
        const clientDate = new Date(+client.deliveredDate).setHours(0,0,0,0);
        return client.isPayed &&
          clientDate >= dates[0].getTime() &&
          clientDate <= dates[1].getTime();
      })
      clientPFisPayed.forEach(item => {
        totalAdvancePF = totalAdvancePF + +item.paymentMethod._advance;
      })
      this.report.pfAdvance = totalAdvancePF;
    })
    this._reportService.getAllGSMClients().subscribe(gsm=> {
      totalAdvanceGSM = 0;
      clientGSMisPayed = gsm.filter(function(client) {
        const clientDate = new Date(+client.deliveredDate).setHours(0,0,0,0);
        return client.isPayed &&
          clientDate >= dates[0].getTime() &&
          clientDate <= dates[1].getTime();
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
          const clientDate = new Date(+client.deliveredDate).setHours(0,0,0,0);
          return client.isPayed &&
            clientDate >= dates[0].getTime() &&
            clientDate <= dates[1].getTime();
        })
        clientPFisPayed.forEach(item => {
          totalIn = totalIn + +item.paymentMethod._cash + +item.paymentMethod._card + +item.paymentMethod._repayment +
            + +item.paymentMethod._advance + +item.paymentMethod._collector;
        })
        clientGSMisPayed = gsm.filter(function(client) {
          const clientDate = new Date(+client.deliveredDate).setHours(0,0,0,0);
          return client.isPayed &&
            clientDate >= dates[0].getTime() &&
            clientDate <= dates[1].getTime();
        })
        clientGSMisPayed.forEach(item => {
          totalIn = totalIn + +item.paymentMethod._cash + +item.paymentMethod._card + +item.paymentMethod._repayment +
            + +item.paymentMethod._advance + +item.paymentMethod._collector;
        })
        this.report.totalIn = totalIn;
      })
    })
  }

  getTotalCash(dates) {
    let totalCashPF;
    let totalCashGSM;
    let clientPFisPayed;
    let clientGSMisPayed;
    this._reportService.getAllPFClients().subscribe(pf => {
      this._reportService.getAllGSMClients().subscribe(gsm => {
        totalCashPF = 0;
        clientPFisPayed = pf.filter(function(client) {
          const clientDate = new Date(+client.deliveredDate).setHours(0,0,0,0);
          return client.isPayed &&
            clientDate >= dates[0].getTime() &&
            clientDate <= dates[1].getTime();
        })
        clientPFisPayed.forEach(item => {
          totalCashPF = +totalCashPF + +item.paymentMethod._cash + +item.paymentMethod._repayment + +item.paymentMethod._advance;
        })
        totalCashGSM = 0;
        clientGSMisPayed = gsm.filter(function(client) {
          const clientDate = new Date(+client.deliveredDate).setHours(0,0,0,0);
          return client.isPayed &&
            clientDate >= dates[0].getTime() &&
            clientDate <= dates[1].getTime();
        })
        clientGSMisPayed.forEach(item => {
          totalCashGSM = +totalCashGSM + +item.paymentMethod._cash + +item.paymentMethod._repayment + +item.paymentMethod._advance;
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
