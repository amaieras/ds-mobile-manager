import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CostComponent } from "./cost/cost.component";

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(costCenterRoutes)],
  exports: [RouterModule],
  providers: []
})
export class CostRoutingModule {}
