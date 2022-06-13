import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminprintedPageRoutingModule } from './adminprinted-routing.module';

import { AdminprintedPage } from './adminprinted.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminprintedPageRoutingModule
  ],
  declarations: [AdminprintedPage]
})
export class AdminprintedPageModule {}
