import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroestudiantePage } from './registroestudiante.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroestudiantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroestudiantePageRoutingModule {}
