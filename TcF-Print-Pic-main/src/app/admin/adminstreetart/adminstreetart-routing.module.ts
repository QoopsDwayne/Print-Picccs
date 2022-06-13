import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminstreetartPage } from './adminstreetart.page';

const routes: Routes = [
  {
    path: '',
    component: AdminstreetartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminstreetartPageRoutingModule {}
