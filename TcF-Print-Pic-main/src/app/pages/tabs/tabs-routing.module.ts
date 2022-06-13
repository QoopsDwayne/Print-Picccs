import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./../home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'feedwall',
        loadChildren: () => import('./../feedwall/feedwall.module').then( m => m.FeedwallPageModule)
      },
      {
        path: 'profilez',
        loadChildren: () => import('./../profilez/profilez.module').then( m => m.ProfilezPageModule)
      },
      {
        path: 'art',
        loadChildren: () => import('./../art/art.module').then( m => m.ArtPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
