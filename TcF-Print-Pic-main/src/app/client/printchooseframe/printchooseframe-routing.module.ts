import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrintchooseframePage } from './printchooseframe.page';

const routes: Routes = [
  {
    path: '',
    component: PrintchooseframePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrintchooseframePageRoutingModule {}
