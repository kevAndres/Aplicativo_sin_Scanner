import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Asegúrate de importar ReactiveFormsModule

import { IonicModule } from '@ionic/angular';

import { EsquelaPageRoutingModule } from './esquela-routing.module';

import { EsquelaPage } from './esquela.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EsquelaPageRoutingModule
  ],
  declarations: [EsquelaPage]
})
export class EsquelaPageModule {}
