import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Asegúrate de importar ReactiveFormsModule

import { IonicModule } from '@ionic/angular';

import { RegistroasignaturaPageRoutingModule } from './registroasignatura-routing.module';

import { RegistroasignaturaPage } from './registroasignatura.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RegistroasignaturaPageRoutingModule
  ],
  declarations: [RegistroasignaturaPage]
})
export class RegistroasignaturaPageModule {}
