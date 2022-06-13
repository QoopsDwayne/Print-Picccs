import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminprintedPage } from './adminprinted.page';

const routes: Routes = [
  {
    path: '',
    component: AdminprintedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminprintedPageRoutingModule {}
