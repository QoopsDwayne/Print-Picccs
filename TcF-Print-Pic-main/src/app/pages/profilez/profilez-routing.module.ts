import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilezPage } from './profilez.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilezPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilezPageRoutingModule {}
