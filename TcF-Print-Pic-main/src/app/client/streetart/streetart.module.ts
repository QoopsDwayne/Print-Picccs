import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StreetartPageRoutingModule } from './streetart-routing.module';

import { StreetartPage } from './streetart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StreetartPageRoutingModule
  ],
  declarations: [StreetartPage]
})
export class StreetartPageModule {}
