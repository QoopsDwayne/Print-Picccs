import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartmodalframePage } from './cartmodalframe.page';

const routes: Routes = [
  {
    path: '',
    component: CartmodalframePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartmodalframePageRoutingModule {}
