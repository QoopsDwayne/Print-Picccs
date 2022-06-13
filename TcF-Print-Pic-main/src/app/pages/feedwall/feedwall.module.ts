import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedwallPageRoutingModule } from './feedwall-routing.module';

import { FeedwallPage } from './feedwall.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedwallPageRoutingModule
  ],
  declarations: [FeedwallPage]
})
export class FeedwallPageModule {}
