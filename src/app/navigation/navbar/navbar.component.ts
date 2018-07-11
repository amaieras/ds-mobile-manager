import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Router} from "@angular/router";
import {AppToolbarService, MenuItem} from "app/app-toolbar/app-toolbar.service";
import {AuthService} from "app/guards/auth.service";
import {FuseConfigService} from "../../../@fuse/services/config.service";
import {Subject} from "rxjs/Subject";
import {navigation} from "app/navigation/navigation";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class NavBarComponent implements OnInit, OnDestroy {
  isDarkTheme = false;
  mainMenuItems;
  activeMenuItem$: Observable<MenuItem>;

  fuseConfig: any;
  navigation: any;

  // Private
  private _unsubscribeAll: Subject<any>;
  constructor(private _toolbarService: AppToolbarService,
              public authService: AuthService, private router: Router,
              private _fuseConfigService: FuseConfigService) {
    // this.mainMenuItems = this._toolbarService.getMenuItems();
    // // push first element to end of array
    // this.mainMenuItems.push(this.mainMenuItems.shift());
    // this.mainMenuItems.push(this.mainMenuItems.shift());
    // this.mainMenuItems.push(this.mainMenuItems.shift());
    // // put `grafice` link to the end
    // this.mainMenuItems.push(this.mainMenuItems.shift());
    // // swap reports link which is invisble with `grafice` links
    // let aux = this.mainMenuItems[this.mainMenuItems.length-1];
    // this.mainMenuItems[this.mainMenuItems.length-1] = this.mainMenuItems[this.mainMenuItems.length - 2];
    // this.mainMenuItems[this.mainMenuItems.length - 2] = aux;
	//
    // this.activeMenuItem$ = this._toolbarService.activeMenuItem$;

    // Set the defaults
    this.navigation = navigation;

    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }
// -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void
  {
    // Subscribe to config changes
    this._fuseConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        this.fuseConfig = config;
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void
  {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  logout(){
    this.authService.doLogout()
      .then((res) => {
        this.router.navigate(['/login']);
      }, (error) => {
        console.log("Logout error", error);
      });
  }
}
