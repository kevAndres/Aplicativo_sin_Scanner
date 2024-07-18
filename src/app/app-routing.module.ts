import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ScannerQRComponent } from 'src/Component/ScannerQR/scanner-qr/scanner-qr.component';
import { AuthGuard } from './services/SesionGuard/AuthGuard';
import { RoleGuard } from './services/SesionGuard/RoleGuard';
import { UnauthorizedComponent } from '../Component/unauthorized/unauthorized/unauthorized.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'registrodocentes',
    loadChildren: () => import('./Docente/registrodocentes/registrodocentes.module').then(m => m.RegistrodocentesPageModule)
   

  },
  {
    path: 'registrorepresentantes',
    loadChildren: () => import('./Representantes/registrorepresentantes/registrorepresentantes.module').then(m => m.RegistrorepresentantesPageModule)   


  },
  {
    path: 'esquela',
    loadChildren: () => import('./Docente/esquela/esquela.module').then(m => m.EsquelaPageModule),  
    canActivate: [AuthGuard,RoleGuard],
    data: { expectedRoles: ['docente'] }
  },
  {
    path: 'paguinainicial',
    loadChildren: () => import('./Docente/paguinainicial/paguinainicial.module').then(m => m.PaguinainicialPageModule),
    canActivate: [AuthGuard,RoleGuard],
    data: { expectedRoles: ['docente'] }

  },
  {
    path: 'paguinaprincipalrepresentante',
    loadChildren: () => import('./Representantes/paguinaprincipalrepresentante/paguinaprincipalrepresentante.module').then(m => m.PaguinaprincipalrepresentantePageModule),
    canActivate: [AuthGuard,RoleGuard],
    data: { expectedRoles: ['representante'] }

  },
  {
    path: 'registroestudiante',
    loadChildren: () => import('./Representantes/registroestudiante/registroestudiante.module').then(m => m.RegistroestudiantePageModule),
    canActivate: [AuthGuard,RoleGuard],
    data: { expectedRoles: ['representante'] }

  },
  {
    path: 'registroasignatura',
    loadChildren: () => import('./Docente/registroasignatura/registroasignatura.module').then(m => m.RegistroasignaturaPageModule),
    canActivate: [AuthGuard,RoleGuard],
    data: { expectedRoles: ['docente'] }

  },
  {
    path: 'vista-esquela-representante',
    loadChildren: () => import('./Representantes/vista-esquela-representante/vista-esquela-representante.module').then(m => m.VistaEsquelaRepresentantePageModule),
    canActivate: [AuthGuard,RoleGuard],
    data: { expectedRoles: ['representante'] }

  },
  {
    path: 'atrasos',
    loadChildren: () => import('./inspector/atrasos/atrasos.module').then(m => m.AtrasosPageModule),
    canActivate: [AuthGuard,RoleGuard],
    data: { expectedRoles: ['inspector'] }

  },
  {
    path: 'scanner-qr',
    component: ScannerQRComponent,
    canActivate: [AuthGuard,RoleGuard],
    data: { expectedRoles: ['inspector'] }

  },
  {
    path: 'tabs',
    loadChildren: () => import('./inspector/tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard,RoleGuard],
    data: { expectedRoles: ['inspector'] }

  },
  {
    path: 'all-atrasos',
    loadChildren: () => import('./inspector/all-atrasos/all-atrasos.module').then(m => m.AllAtrasosPageModule),
    canActivate: [AuthGuard,RoleGuard],
    data: { expectedRoles: ['inspector'] }

  },
  {
    path: 'configuracion',
    loadChildren: () => import('./inspector/configuracion/configuracion.module').then(m => m.ConfiguracionPageModule),
    canActivate: [AuthGuard,RoleGuard],
    data: { expectedRoles: ['inspector'] }

  },
  {
    path: 'filtros',
    loadChildren: () => import('./inspector/filtros/filtros.module').then( m => m.FiltrosPageModule),
    canActivate: [AuthGuard,RoleGuard],
    data: { expectedRoles: ['inspector'] }
  },
  {
    path: 'reporte-xcurso',
    loadChildren: () => import('./inspector/reporte-xcurso/reporte-xcurso.module').then( m => m.ReporteXcursoPageModule),
    canActivate: [AuthGuard,RoleGuard],
    data: { expectedRoles: ['inspector'] }

  },
  {
    path: 'reporte-xestudiante',
    loadChildren: () => import('./inspector/reporte-xestudiante/reporte-xestudiante.module').then( m => m.ReporteXestudiantePageModule),
    canActivate: [AuthGuard,RoleGuard],
    data: { expectedRoles: ['inspector'] }

  },
  {
    path: 'reporte-xfecha',
    loadChildren: () => import('./inspector/reporte-xfecha/reporte-xfecha.module').then( m => m.ReporteXfechaPageModule),
    canActivate: [AuthGuard,RoleGuard],
    data: { expectedRoles: ['inspector'] }
  },
  {
    path: 'vista-esquela-docente',
    loadChildren: () => import('./Docente/vista-esquela-docente/vista-esquela-docente.module').then( m => m.VistaEsquelaDocentePageModule),
    canActivate: [AuthGuard,RoleGuard],
    data: { expectedRoles: ['docente'] }
  },
  {
    path: 'unauthorized',
    loadChildren: () => import('../Component/unauthorized/unauthorized/unauthorized.module').then(m => m.UnauthorizedPageModule)
  
  },
  //YO AGREGE ESTAS RUTAS NO LE ELIMINES LA HACER EL MERGE
  { path: 'curso-crud',
    loadChildren: () => import('./inspector/curso-crud/curso-crud.module').then(m => m.CursoCRUDPageModule)
   },
  {
    path: 'asignatura-crud',
    loadChildren: () => import('./inspector/asignatura-crud/asignatura-crud.module').then( m => m.AsignaturaCrudPageModule)
  },  {
    path: 'docente-crud',
    loadChildren: () => import('./inspector/docente-crud/docente-crud.module').then( m => m.DocenteCrudPageModule)
  },
  {
    path: 'representante-crud',
    loadChildren: () => import('./inspector/representante-crud/representante-crud.module').then( m => m.RepresentanteCrudPageModule)
  }




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
