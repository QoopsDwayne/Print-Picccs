import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilezPageRoutingModule } from './profilez-routing.module';

import { ProfilezPage } from './profilez.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilezPageRoutingModule
  ],
  declarations: [ProfilezPage]
})
export class ProfilezPageModule {}
