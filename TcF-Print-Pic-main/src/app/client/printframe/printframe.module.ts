import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrintframePageRoutingModule } from './printframe-routing.module';

import { PrintframePage } from './printframe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrintframePageRoutingModule
  ],
  declarations: [PrintframePage]
})
export class PrintframePageModule {}
