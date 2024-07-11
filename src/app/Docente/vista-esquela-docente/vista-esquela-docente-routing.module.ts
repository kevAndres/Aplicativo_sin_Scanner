import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VistaEsquelaDComponent } from '../../../Component/VistaEsquela/vista-esquela-d/vista-esquela-d.component';

import { VistaEsquelaDocentePage } from './vista-esquela-docente.page';

const routes: Routes = [
  {
    path: '',
    component: VistaEsquelaDComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VistaEsquelaDocentePageRoutingModule {}
