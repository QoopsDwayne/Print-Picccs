import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadpicPage } from './uploadpic.page';

const routes: Routes = [
  {
    path: '',
    component: UploadpicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadpicPageRoutingModule {}
