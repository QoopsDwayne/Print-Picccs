import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StreetartPage } from './streetart.page';

const routes: Routes = [
  {
    path: '',
    component: StreetartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StreetartPageRoutingModule {}
