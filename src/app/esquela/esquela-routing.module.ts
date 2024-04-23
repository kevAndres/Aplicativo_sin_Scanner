import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EsquelaPage } from './esquela.page';

const routes: Routes = [
  {
    path: '',
    component: EsquelaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EsquelaPageRoutingModule {}
