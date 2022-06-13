import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedchatPage } from './feedchat.page';

const routes: Routes = [
  {
    path: '',
    component: FeedchatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedchatPageRoutingModule {}
