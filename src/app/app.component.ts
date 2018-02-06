import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppToolbarService, MenuItem } from './app-toolbar/app-toolbar.service';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    isDarkTheme = false;
    mainMenuItems;
    activeMenuItem$: Observable<MenuItem>;

    constructor(private toolbarService: AppToolbarService) {
        this.mainMenuItems = this.toolbarService.getMenuItems();
        //push first element to end of array
        this.mainMenuItems.push(this.mainMenuItems.shift());
        this.mainMenuItems.push(this.mainMenuItems.shift());
        this.mainMenuItems.push(this.mainMenuItems.shift());
        this.activeMenuItem$ = this.toolbarService.activeMenuItem$;
    }
}
