import {Component, OnInit} from '@angular/core';
import {UtilService} from '../util.service';
import {MessageService} from 'primeng/components/common/messageservice';
import {Message} from 'primeng/components/common/api';

@Component({
  selector: 'app-info-message',
  templateUrl: './info-message.component.html',
  providers: [MessageService]
})
export class InfoMessageComponent implements OnInit {
  msgs: Message[] = [];
  showFeatureMsg: Boolean = true;

  constructor(private utilService: UtilService, private _messageService: MessageService) {
  }

  ngOnInit(): void {
    this.initInfoFromLocalStorage();
  }

  initInfoFromLocalStorage() {
    if (localStorage.showFeatureMsg) {
      this.showFeatureMsg = localStorage.showFeatureMsg;
    }
  }
  hideMessage() {
    this.showFeatureMsg = false;
    localStorage.showFeatureMsg = false;
  }

}
