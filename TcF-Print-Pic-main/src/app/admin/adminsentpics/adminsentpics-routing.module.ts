import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminsentpicsPage } from './adminsentpics.page';

const routes: Routes = [
  {
    path: '',
    component: AdminsentpicsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminsentpicsPageRoutingModule {}
