import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminstreetartPageRoutingModule } from './adminstreetart-routing.module';

import { AdminstreetartPage } from './adminstreetart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminstreetartPageRoutingModule
  ],
  declarations: [AdminstreetartPage]
})
export class AdminstreetartPageModule {}
