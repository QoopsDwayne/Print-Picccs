import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartmodalartPage } from './cartmodalart.page';

const routes: Routes = [
  {
    path: '',
    component: CartmodalartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartmodalartPageRoutingModule {}
