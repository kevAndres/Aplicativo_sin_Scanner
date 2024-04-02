import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Asegúrate de importar ReactiveFormsModule

import { IonicModule } from '@ionic/angular';

import { RegistrorepresentantesPageRoutingModule } from './registrorepresentantes-routing.module';

import { RegistrorepresentantesPage } from './registrorepresentantes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RegistrorepresentantesPageRoutingModule
  ],
  declarations: [RegistrorepresentantesPage]
})
export class RegistrorepresentantesPageModule {}
