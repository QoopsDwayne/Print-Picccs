import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartmodalartPageRoutingModule } from './cartmodalart-routing.module';

import { CartmodalartPage } from './cartmodalart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CartmodalartPageRoutingModule
  ],
  declarations: [CartmodalartPage]
})
export class CartmodalartPageModule {}
