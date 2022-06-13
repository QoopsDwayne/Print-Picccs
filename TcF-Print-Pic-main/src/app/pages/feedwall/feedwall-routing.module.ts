import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedwallPage } from './feedwall.page';

const routes: Routes = [
  {
    path: '',
    component: FeedwallPage
  },
  {
    path: 'feedchat/:id',
    loadChildren: () => import('./feedchat/feedchat.module').then( m => m.FeedchatPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedwallPageRoutingModule {}
