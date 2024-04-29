import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Asegúrate de importar ReactiveFormsModule

import { IonicModule } from '@ionic/angular';

import { RegistroestudiantePageRoutingModule } from './registroestudiante-routing.module';

import { RegistroestudiantePage } from './registroestudiante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RegistroestudiantePageRoutingModule,
  ],
  declarations: [RegistroestudiantePage],
})
export class RegistroestudiantePageModule {}
