import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'verify',
    loadChildren: () => import('./verify/verify.module').then( m => m.VerifyPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'image-modal',
    loadChildren: () => import('./modals/image-modal/image-modal.module').then( m => m.ImageModalPageModule)
  },
  {
    path: 'adminhome',
    loadChildren: () => import('./admin/adminhome/adminhome.module').then( m => m.AdminhomePageModule)
  },
  {
    path: 'adminprinted',
    loadChildren: () => import('./admin/adminprinted/adminprinted.module').then( m => m.AdminprintedPageModule)
  },
  {
    path: 'adminsentpics',
    loadChildren: () => import('./admin/adminsentpics/adminsentpics.module').then( m => m.AdminsentpicsPageModule)
  },
  {
    path: 'adminfinishedorders',
    loadChildren: () => import('./admin/adminfinishedorders/adminfinishedorders.module').then( m => m.AdminfinishedordersPageModule)
  },
  {
    path: 'profile2',
    loadChildren: () => import('./admin/profile2/profile2.module').then( m => m.Profile2PageModule)
  },
  {
    path: 'adminusers',
    loadChildren: () => import('./admin/adminusers/adminusers.module').then( m => m.AdminusersPageModule)
  },
  {
    path: 'adminstreetart',
    loadChildren: () => import('./admin/adminstreetart/adminstreetart.module').then( m => m.AdminstreetartPageModule)
  },
  {
    path: 'adminsframes',
    loadChildren: () => import('./admin/adminsframes/adminsframes.module').then( m => m.AdminsframesPageModule)
  },
  {
    path: 'printhistory',
    loadChildren: () => import('./admin/printhistory/printhistory.module').then( m => m.PrinthistoryPageModule)
  },
  {
    path: 'uploadpic',
    loadChildren: () => import('./modals/uploadpic/uploadpic.module').then( m => m.UploadpicPageModule)
  },
  {
    path: 'cart-modal',
    loadChildren: () => import('./modals/cart-modal/cart-modal.module').then( m => m.CartModalPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./modals/checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  // {
  //   path: 'home',
  //   loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  // },
  // {
  //   path: 'art',
  //   loadChildren: () => import('./pages/art/art.module').then( m => m.ArtPageModule)
  // },
  // {
  //   path: 'profilez',
  //   loadChildren: () => import('./pages/profilez/profilez.module').then( m => m.ProfilezPageModule)
  // },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'art-checkout',
    loadChildren: () => import('./modals/art-checkout/art-checkout.module').then( m => m.ArtCheckoutPageModule)
  },
  {
    path: 'sendcoin',
    loadChildren: () => import('./modals/sendcoin/sendcoin.module').then( m => m.SendcoinPageModule)
  },
  // {
  //   path: 'art',
  //   loadChildren: () => import('./pages/art/art.module').then( m => m.ArtPageModule)
  // },
  {
    path: 'art-cart-modal',
    loadChildren: () => import('./modals/art-cart-modal/art-cart-modal.module').then( m => m.ArtCartModalPageModule)
  },
  {
    path: 'streetart',
    loadChildren: () => import('./client/streetart/streetart.module').then( m => m.StreetartPageModule)
  },
  {
    path: 'cartmodalart',
    loadChildren: () => import('./client/cartmodalart/cartmodalart.module').then( m => m.CartmodalartPageModule)
  },
  {
    path: 'printchooseframe',
    loadChildren: () => import('./client/printchooseframe/printchooseframe.module').then( m => m.PrintchooseframePageModule)
  },
  {
    path: 'printframe',
    loadChildren: () => import('./client/printframe/printframe.module').then( m => m.PrintframePageModule)
  },
  {
    path: 'cartmodalframe',
    loadChildren: () => import('./client/cartmodalframe/cartmodalframe.module').then( m => m.CartmodalframePageModule)
  },
  {
    path: 'payhost',
    loadChildren: () => import('./modals/payhost/payhost.module').then( m => m.PayhostPageModule)
  },
  // {
  //   path: 'feedwall',
  //   loadChildren: () => import('./pages/feedwall/feedwall.module').then( m => m.FeedwallPageModule)
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
