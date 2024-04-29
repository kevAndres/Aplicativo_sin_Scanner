import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaguinaprincipalrepresentantePage } from './paguinaprincipalrepresentante.page';

const routes: Routes = [
  {
    path: '',
    component: PaguinaprincipalrepresentantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaguinaprincipalrepresentantePageRoutingModule {}
