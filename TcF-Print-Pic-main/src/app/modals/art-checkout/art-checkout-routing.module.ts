import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArtCheckoutPage } from './art-checkout.page';

const routes: Routes = [
  {
    path: '',
    component: ArtCheckoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtCheckoutPageRoutingModule {}
