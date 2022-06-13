import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArtCheckoutPageRoutingModule } from './art-checkout-routing.module';

import { ArtCheckoutPage } from './art-checkout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArtCheckoutPageRoutingModule
  ],
  declarations: [ArtCheckoutPage]
})
export class ArtCheckoutPageModule {}
