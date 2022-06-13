import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArtCartModalPage } from './art-cart-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ArtCartModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtCartModalPageRoutingModule {}
