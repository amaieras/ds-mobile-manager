import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';

import { FuseNavigationModule } from '@fuse/components/index';
import { FuseSharedModule } from '@fuse/shared.module';

import { NavbarComponent} from "./navbar.component";

@NgModule({
    declarations: [
        NavbarComponent
    ],
    imports     : [
        MatButtonModule,
        MatIconModule,

        FuseSharedModule,
        FuseNavigationModule
    ],
    exports     : [
        NavbarComponent
    ]
})
export class NavbarModule
{
}
