import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UnauthorizedComponent } from './unauthorized.component';
import { IonicModule } from '@ionic/angular';  // Importa IonicModule

const routes: Routes = [
  {
    path: '',
    component: UnauthorizedComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IonicModule  // Asegúrate de importar IonicModule aquí
  ],
  declarations: [UnauthorizedComponent],
})
export class UnauthorizedPageModule {}
