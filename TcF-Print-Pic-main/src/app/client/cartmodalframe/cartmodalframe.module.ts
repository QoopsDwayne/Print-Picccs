import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartmodalframePageRoutingModule } from './cartmodalframe-routing.module';

import { CartmodalframePage } from './cartmodalframe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartmodalframePageRoutingModule
  ],
  declarations: [CartmodalframePage]
})
export class CartmodalframePageModule {}
