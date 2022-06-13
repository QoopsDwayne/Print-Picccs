import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminusersPageRoutingModule } from './adminusers-routing.module';

import { AdminusersPage } from './adminusers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminusersPageRoutingModule
  ],
  declarations: [AdminusersPage]
})
export class AdminusersPageModule {}
