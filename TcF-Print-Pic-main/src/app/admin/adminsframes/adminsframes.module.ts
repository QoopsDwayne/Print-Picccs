import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminsframesPageRoutingModule } from './adminsframes-routing.module';

import { AdminsframesPage } from './adminsframes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminsframesPageRoutingModule
  ],
  declarations: [AdminsframesPage]
})
export class AdminsframesPageModule {}
