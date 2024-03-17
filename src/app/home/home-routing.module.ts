import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { RegistrodocentesPage } from '../registrodocentes/registrodocentes.page';
import { RegistrorepresentantesPage } from '../registrorepresentantes/registrorepresentantes.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'registrodocentes',
    component: RegistrodocentesPage
  },
  {
    path: 'registrorepresentantes',
    component: RegistrorepresentantesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
