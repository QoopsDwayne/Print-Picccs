import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrintframePage } from './printframe.page';

const routes: Routes = [
  {
    path: '',
    component: PrintframePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrintframePageRoutingModule {}
