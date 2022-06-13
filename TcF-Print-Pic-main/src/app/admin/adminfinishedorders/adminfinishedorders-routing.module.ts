import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminfinishedordersPage } from './adminfinishedorders.page';

const routes: Routes = [
  {
    path: '',
    component: AdminfinishedordersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminfinishedordersPageRoutingModule {}
