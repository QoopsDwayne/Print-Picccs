import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArtPageRoutingModule } from './art-routing.module';

import { ArtPage } from './art.page';
import { ArtCartModalPageModule } from './../../modals/art-cart-modal/art-cart-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArtCartModalPageModule,
    ArtPageRoutingModule
  ],
  declarations: [ArtPage]
})
export class ArtPageModule {}
