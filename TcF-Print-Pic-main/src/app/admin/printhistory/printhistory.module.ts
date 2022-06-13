import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrinthistoryPageRoutingModule } from './printhistory-routing.module';

import { PrinthistoryPage } from './printhistory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrinthistoryPageRoutingModule
  ],
  declarations: [PrinthistoryPage]
})
export class PrinthistoryPageModule {}
