import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllAtrasosPage } from './all-atrasos.page';

const routes: Routes = [
  {
    path: '',
    component: AllAtrasosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllAtrasosPageRoutingModule {}
