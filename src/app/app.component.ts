import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppToolbarService, MenuItem } from './app-toolbar/app-toolbar.service';
import {AuthService} from "./guards/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    isDarkTheme = false;
    mainMenuItems;
    activeMenuItem$: Observable<MenuItem>;

    constructor(private toolbarService: AppToolbarService,
                public authService: AuthService, private router: Router) {
        this.mainMenuItems = this.toolbarService.getMenuItems();
        // push first element to end of array
        this.mainMenuItems.push(this.mainMenuItems.shift());
        this.mainMenuItems.push(this.mainMenuItems.shift());
        this.mainMenuItems.push(this.mainMenuItems.shift());

        // put `grafice` link to the end
        this.mainMenuItems.push(this.mainMenuItems.shift());
        // swap reports link which is invisble with `grafice` links
        let aux = this.mainMenuItems[this.mainMenuItems.length-1];
        this.mainMenuItems[this.mainMenuItems.length-1] = this.mainMenuItems[this.mainMenuItems.length - 2];
        this.mainMenuItems[this.mainMenuItems.length - 2] = aux;

        this.activeMenuItem$ = this.toolbarService.activeMenuItem$;
    }


  logout(){
    this.authService.doLogout()
      .then((res) => {
        this.router.navigate(['/clients']);
      }, (error) => {
        console.log("Logout error", error);
      });
  }
}
