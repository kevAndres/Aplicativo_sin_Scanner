import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VistaEsquelaComponent} from '../../Component/VistaEsquela/vista-esquela/vista-esquela.component';
import { VistaEsquelaRepresentantePage } from './vista-esquela-representante.page';

const routes: Routes = [
  {
    path: '',
    component: VistaEsquelaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VistaEsquelaRepresentantePageRoutingModule {}
