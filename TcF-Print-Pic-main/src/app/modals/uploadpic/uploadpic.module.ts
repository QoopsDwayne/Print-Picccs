import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadpicPageRoutingModule } from './uploadpic-routing.module';

import { UploadpicPage } from './uploadpic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadpicPageRoutingModule
  ],
  declarations: [UploadpicPage]
})
export class UploadpicPageModule {}
