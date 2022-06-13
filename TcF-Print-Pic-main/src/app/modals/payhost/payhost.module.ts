import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayhostPageRoutingModule } from './payhost-routing.module';

import { PayhostPage } from './payhost.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayhostPageRoutingModule
  ],
  declarations: [PayhostPage]
})
export class PayhostPageModule {}
