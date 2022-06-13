import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArtCartModalPageRoutingModule } from './art-cart-modal-routing.module';

import { ArtCartModalPage } from './art-cart-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArtCartModalPageRoutingModule
  ],
  declarations: [ArtCartModalPage]
})
export class ArtCartModalPageModule {}
