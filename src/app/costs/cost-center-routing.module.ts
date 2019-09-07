import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CostComponent } from "./cost/cost.component";
import { CostService } from "./cost.service";
import { CostListComponent } from "./cost-list/cost-list.component";

const costCenterRoutes: Routes = [
  {
    path: "costs",
    component: CostComponent,
    children: [
      {
        path: "",
        redirectTo: "costs",
        pathMatch: "full"
      }
    ],
    data: {
      title: "Adaugă cheltuieli",
      position: 2
    }
  },
  {
    path: "list",
    component: CostListComponent,
    data: {
      title: "Arată cheltuieli",
      position: 3
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(costCenterRoutes)],
  exports: [RouterModule],
  providers: [CostService]
})
export class CostRoutingModule {}
