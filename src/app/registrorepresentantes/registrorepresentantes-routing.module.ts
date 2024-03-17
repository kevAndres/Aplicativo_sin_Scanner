import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrorepresentantesPage } from './registrorepresentantes.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrorepresentantesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrorepresentantesPageRoutingModule {}
