import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaguinainicialPage } from './paguinainicial.page';

const routes: Routes = [
  {
    path: '',
    component: PaguinainicialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaguinainicialPageRoutingModule {}
