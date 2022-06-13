import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrinthistoryPage } from './printhistory.page';

const routes: Routes = [
  {
    path: '',
    component: PrinthistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrinthistoryPageRoutingModule {}
