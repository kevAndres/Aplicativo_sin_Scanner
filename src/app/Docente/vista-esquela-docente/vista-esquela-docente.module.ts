import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VistaEsquelaDocentePageRoutingModule } from './vista-esquela-docente-routing.module';
import { VistaEsquelaDComponent } from '../../../Component/VistaEsquela/vista-esquela-d/vista-esquela-d.component';

import { VistaEsquelaDocentePage } from './vista-esquela-docente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VistaEsquelaDocentePageRoutingModule
  ],
  declarations: [VistaEsquelaDocentePage,VistaEsquelaDComponent]
})
export class VistaEsquelaDocentePageModule {}
