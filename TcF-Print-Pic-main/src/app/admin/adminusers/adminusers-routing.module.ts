import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminusersPage } from './adminusers.page';

const routes: Routes = [
  {
    path: '',
    component: AdminusersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminusersPageRoutingModule {}
