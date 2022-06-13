import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminfinishedordersPageRoutingModule } from './adminfinishedorders-routing.module';

import { AdminfinishedordersPage } from './adminfinishedorders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminfinishedordersPageRoutingModule
  ],
  declarations: [AdminfinishedordersPage]
})
export class AdminfinishedordersPageModule {}
