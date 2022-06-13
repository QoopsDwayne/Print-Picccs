import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrintchooseframePageRoutingModule } from './printchooseframe-routing.module';

import { PrintchooseframePage } from './printchooseframe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrintchooseframePageRoutingModule
  ],
  declarations: [PrintchooseframePage]
})
export class PrintchooseframePageModule {}
