import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {MenuItem} from 'primeng/api';
import {Router} from '@angular/router';
import {AuthService} from 'app/guards/auth.service';
import {AppToolbarService} from 'app/app-toolbar/app-toolbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isDarkTheme = false;
  mainMenuItems;
  activeMenuItem$: Observable<MenuItem>;

  constructor( private router: Router,
               private toolbarService: AppToolbarService,
               public authService: AuthService

  ) {
    this.mainMenuItems = this.toolbarService.getMenuItems();
    // push first element to end of array
    this.mainMenuItems.push(this.mainMenuItems.shift());
    this.mainMenuItems.push(this.mainMenuItems.shift());
    this.mainMenuItems.push(this.mainMenuItems.shift());
    // put `grafice` link to the end
    this.mainMenuItems.push(this.mainMenuItems.shift());
    // swap reports link which is invisble with `grafice` links
    const aux = this.mainMenuItems[this.mainMenuItems.length - 1];
    this.mainMenuItems[this.mainMenuItems.length - 1] = this.mainMenuItems[this.mainMenuItems.length - 2];
    this.mainMenuItems[this.mainMenuItems.length - 2] = aux;
    this.activeMenuItem$ = this.toolbarService.activeMenuItem$;
  }

  ngOnInit() {
  }

  logout(){
    this.authService.doLogout()
      .then((res) => {
        this.router.navigate(['/login']);
      }, (error) => {
        console.log('Logout error', error);
      });
  }
}
