import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminsentpicsPageRoutingModule } from './adminsentpics-routing.module';

import { AdminsentpicsPage } from './adminsentpics.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminsentpicsPageRoutingModule
  ],
  declarations: [AdminsentpicsPage]
})
export class AdminsentpicsPageModule {}
