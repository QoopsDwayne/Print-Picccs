import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminsframesPage } from './adminsframes.page';

const routes: Routes = [
  {
    path: '',
    component: AdminsframesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminsframesPageRoutingModule {}
