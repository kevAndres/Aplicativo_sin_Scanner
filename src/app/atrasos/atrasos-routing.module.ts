import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtrasosPage } from './atrasos.page';

const routes: Routes = [
  {
    path: '',
    component: AtrasosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtrasosPageRoutingModule {}
