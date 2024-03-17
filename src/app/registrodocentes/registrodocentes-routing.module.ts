import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrodocentesPage } from './registrodocentes.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrodocentesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrodocentesPageRoutingModule {}
