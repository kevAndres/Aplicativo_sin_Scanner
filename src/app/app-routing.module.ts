import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'registrodocentes',
    loadChildren: () => import('./registrodocentes/registrodocentes.module').then( m => m.RegistrodocentesPageModule)
  },
  {
    path: 'registrorepresentantes',
    loadChildren: () => import('./registrorepresentantes/registrorepresentantes.module').then( m => m.RegistrorepresentantesPageModule)
  },
  {
    path: 'esquela',
    loadChildren: () => import('./esquela/esquela.module').then( m => m.EsquelaPageModule)
  },
  {
    path: 'paguinainicial',
    loadChildren: () => import('./paguinainicial/paguinainicial.module').then( m => m.PaguinainicialPageModule)
  },
  {
    path: 'paguinaprincipalrepresentante',
    loadChildren: () => import('./paguinaprincipalrepresentante/paguinaprincipalrepresentante.module').then( m => m.PaguinaprincipalrepresentantePageModule)
  },
  {
    path: 'registroestudiante',
    loadChildren: () => import('./registroestudiante/registroestudiante.module').then( m => m.RegistroestudiantePageModule)
  },
  {
    path: 'registroasignatura',
    loadChildren: () => import('./registroasignatura/registroasignatura.module').then( m => m.RegistroasignaturaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
