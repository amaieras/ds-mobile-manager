import { Component, OnInit } from '@angular/core';
import {ReportService} from '../../shared/reports/report.service';
import {ReportMoney} from '../../model/ReportMoney';


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
    this.rangeDates[0].setHours(0, 0, 0, 0);
    this.rangeDates[1].setHours(0, 0, 0, 0);
    const event: Event = null;
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
    if (this.rangeDates[1] !== null && this.rangeDates[0].getTime() <= this.rangeDates[1].getTime()) {
      this.getCheckoutForDate(this.rangeDates);
    }
  }
  getCashPFGSM(dates) {
    let totalCashGSM = 0;
    let totalGSM = 0;
    let clientGSMisPayed;
    this._reportService.getAllGSMClients().subscribe(gsm => {
      clientGSMisPayed = gsm.filter(function (client) {
        const clientDate = new Date(+client.addedDate).setHours(0, 0, 0, 0);
        return clientDate >= dates[0].getTime() && clientDate <= dates[1].getTime();
      });
      clientGSMisPayed.forEach(item => {
        totalCashGSM = totalCashGSM + +item.paymentMethod._advance;

      });
    });
    this._reportService.getAllGSMClients().subscribe(gsm => {
      clientGSMisPayed = gsm.filter(function (client) {
        const clientDate = new Date(+client.deliveredDate).setHours(0, 0, 0, 0);
        return clientDate >= dates[0].getTime() && clientDate <= dates[1].getTime() && client.isPayed;
      });
      clientGSMisPayed.forEach(item => {
        totalCashGSM = totalCashGSM + +item.paymentMethod._cash + +item.paymentMethod._repayment;
        totalGSM += +item.paymentMethod._cash + +item.paymentMethod._card + +item.paymentMethod._advance + +item.paymentMethod._collector +
          +item.paymentMethod._repayment;
      });
      totalCashGSM = totalCashGSM || 0;
      this.report.gsmCash = totalCashGSM || 0;
      this.report.gsmTotal = totalGSM || 0;
    });
  }

  getCardPFGSM(dates) {
    let totalCardGSM ;
    let clientGSMisPayed;

    this._reportService.getAllGSMClients().subscribe(gsm => {
      totalCardGSM = 0;
      clientGSMisPayed = gsm.filter(client => {
        const clientDate = new Date(+client.deliveredDate).setHours(0, 0, 0, 0);
        return client.isPayed &&
          clientDate >= dates[0].getTime() &&
          clientDate <= dates[1].getTime();
      });
      clientGSMisPayed.forEach(item => {
        totalCardGSM = totalCardGSM + +item.paymentMethod._collector;
      });
      this.report.gsmCard = totalCardGSM || 0;
    });
  }

  getRepaymentPFGSM(dates) {
    let totalRepaymentGSM ;
    let clientGSMisPayed;
    this._reportService.getAllGSMClients().subscribe(gsm => {
      totalRepaymentGSM = 0;
      clientGSMisPayed = gsm.filter(function(client) {
        const clientDate = new Date(+client.deliveredDate).setHours(0, 0, 0, 0);
        return client.isPayed &&
          clientDate >= dates[0].getTime() &&
          clientDate <= dates[1].getTime();
      });
      clientGSMisPayed.forEach(item => {
        totalRepaymentGSM = totalRepaymentGSM + +item.paymentMethod._repayment;
      });
      this.report.gsmRepayment = totalRepaymentGSM || 0;
    });
  }

  getAdvancePFGSM(dates) {
    let totalAdvanceGSM ;
    let clientGSMisPayed;
    this._reportService.getAllGSMClients().subscribe(gsm => {
      totalAdvanceGSM = 0;
      clientGSMisPayed = gsm.filter(function(client) {
        const clientDate = new Date(+client.addedDate).setHours(0, 0, 0, 0);
        return clientDate >= dates[0].getTime() && clientDate <= dates[1].getTime();
      });
      clientGSMisPayed.forEach(item => {
        totalAdvanceGSM = totalAdvanceGSM + +item.paymentMethod._advance;
      });
      this.report.gsmAdvance = totalAdvanceGSM;
    });
  }

  getTotalIn(dates) {
    let totalPrice = 0;
    let clientGSMByDate;
    this._reportService.getAllGSMClients().subscribe(gsm => {
      clientGSMByDate = gsm.filter(client => {
        const clientDate = new Date(+client.deliveredDate).setHours(0, 0, 0, 0);
        return clientDate >= dates[0].getTime() && clientDate <= dates[1].getTime();
      });
      console.log(clientGSMByDate)
      clientGSMByDate.forEach(clientByDate => {
        clientByDate["phoneList"].forEach(phone => {
          phone.problems.forEach(problem => {
            const quantity = problem.phoneQuantity === undefined ? 1 : +problem.phoneQuantity;
            totalPrice += problem.pricePerPart * +quantity;
          });
        });
      });
      this.report.totalIn = totalPrice;
    });
  }

  getTotalCash(dates) {
    let totalCashGSM = 0;
    let clientGSMByDate;
      this._reportService.getAllGSMClients().subscribe(gsm => {
        clientGSMByDate = gsm.filter(client => {
          const clientDate = new Date(+client.addedDate).setHours(0, 0, 0, 0);
          return clientDate >= dates[0].getTime() && clientDate <= dates[1].getTime();
        });
        clientGSMByDate.forEach(item => {
          totalCashGSM = +totalCashGSM + +item.paymentMethod._advance;
        });
        clientGSMByDate = gsm.filter(client => {
          const clientDate = new Date(+client.deliveredDate).setHours(0, 0, 0, 0);
          return clientDate >= dates[0].getTime() && clientDate <= dates[1].getTime() && client.isPayed;
        });

        console.log(clientGSMByDate)
        clientGSMByDate.forEach(item => {
          totalCashGSM = +totalCashGSM + +item.paymentMethod._cash + +item.paymentMethod._repayment;
        });
        this.report.totalCash = totalCashGSM;
      });
  }

  getTotalBank(dates) {
    let totalBank;
    let clientGSMisPayed;
      this._reportService.getAllGSMClients().subscribe(gsm => {
        totalBank = 0;
        clientGSMisPayed = gsm.filter(function(client) {
          const clientDate = new Date(+client.deliveredDate).setHours(0, 0, 0, 0);
          return client.isPayed &&
            clientDate >= dates[0].getTime() &&
            clientDate <= dates[1].getTime();
        });
        clientGSMisPayed.forEach(item => {
          totalBank = totalBank + +item.paymentMethod._card + +item.paymentMethod._collector;
        });
        this.report.totalBank = totalBank;
      });
  }
}
