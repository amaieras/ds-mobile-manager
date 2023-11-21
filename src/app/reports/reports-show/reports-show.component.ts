import { Component, OnInit } from '@angular/core';
import {ReportService} from '../../shared/reports/report.service';
import {ReportMoney} from '../../model/ReportMoney';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';


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
    this.getFilteredClients(dates, 'gsm').subscribe((filteredClients) => {
      this.getCashPFGSM(filteredClients);
      this.getCollectorCardPFGSM(filteredClients);
      this.getBankCard(filteredClients);
      this.getRepaymentPFGSM(filteredClients);
      this.getAdvancePFGSM(filteredClients);
      this.getTotalCash(filteredClients);
      this.getTotalBank(filteredClients);
      this.getTotalIn(filteredClients);
    });
  }
  onRangeSelect(event) {
    if (this.rangeDates[1] !== null && this.rangeDates[0].getTime() <= this.rangeDates[1].getTime()) {
      this.getCheckoutForDate(this.rangeDates);
    }
  }
  getCashPFGSM(clientGSMisPayed) {
    let totalCashGSM = 0;
    clientGSMisPayed.forEach(item => {
      const paymentMethod = item.paymentMethod;
      totalCashGSM += [
        +paymentMethod._cash || 0,
        +paymentMethod._repayment || 0,
      ].reduce((sum, value) => sum + value, 0);
    });
    this.report.gsmCash = totalCashGSM || 0;
  }

  getCollectorCardPFGSM(clientGSMisPayed) {
    let totalCardGSM = 0;
    clientGSMisPayed.forEach(item => {
      totalCardGSM += +item.paymentMethod._collector || 0;
    });
    this.report.gsmCollector = totalCardGSM || 0;
  }
  getBankCard(clientGSMisPayed) {
    let totalCardGSM = 0;
    clientGSMisPayed.forEach(item => {
      totalCardGSM += +item.paymentMethod._card || 0;
    });
    this.report.gsmCard = totalCardGSM || 0;
  }
  getRepaymentPFGSM(clientGSMisPayed) {
    let totalRepaymentGSM = 0;
    clientGSMisPayed.forEach(item => {
      totalRepaymentGSM += +item.paymentMethod._repayment || 0;
    });
    this.report.gsmRepayment = totalRepaymentGSM || 0;
  }

  getAdvancePFGSM(clientGSMisPayed) {
    let totalAdvanceGSM = 0;
    clientGSMisPayed.forEach(item => {
      totalAdvanceGSM += +item.paymentMethod._advance || 0;
    });
    this.report.gsmAdvance = totalAdvanceGSM;
  }

  getTotalIn(clientGSMByDate) {
    let totalPrice = 0;
    clientGSMByDate.forEach(item => {
      const paymentMethod = item.paymentMethod;
      totalPrice += [
        +paymentMethod._advance || 0,
        +paymentMethod._cash || 0,
        +paymentMethod._card || 0,
        +paymentMethod._repayment || 0,
        +paymentMethod._collector || 0,
      ].reduce((sum, value) => sum + value, 0);
    });

    this.report.totalIn = totalPrice;
  }

  getFilteredClients(dates, clientType): Observable<any[]> {
    return this._reportService.getClientsByType(clientType).pipe(
      map((gsm: any[]) => {
        return gsm.filter(client => {
          const clientDate = new Date(+client.deliveredDate).setHours(0, 0, 0, 0);
          return clientDate >= dates[0].getTime() && clientDate <= dates[1].getTime();
        });
      })
    );
  }
  getTotalCash(clientGSMByDate) {
    let totalCashGSM = 0;
    clientGSMByDate.forEach(item => {
      const paymentMethod = item.paymentMethod;
      totalCashGSM += [
        +paymentMethod._advance || 0,
        +paymentMethod._cash || 0,
        +paymentMethod._repayment || 0,
      ].reduce((sum, value) => sum + value, 0);
    });
    this.report.totalCash = totalCashGSM;
  }

  getTotalBank(clientGSMisPayed) {
    let totalBank = 0;
    clientGSMisPayed.forEach(item => {
      const paymentMethod = item.paymentMethod;
      totalBank += [
        +paymentMethod._card || 0,
        +paymentMethod._collector || 0,
      ].reduce((sum, value) => sum + value, 0);
    });
    this.report.totalBank = totalBank;
  }
}
