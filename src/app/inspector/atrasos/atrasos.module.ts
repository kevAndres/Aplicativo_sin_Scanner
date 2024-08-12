import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Asegúrate de importar ReactiveFormsModule

import { IonicModule } from '@ionic/angular';

import { AtrasosPageRoutingModule } from './atrasos-routing.module';

import { AtrasosPage } from './atrasos.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AtrasosPageRoutingModule,
    ReactiveFormsModule,
    
  ],
  declarations: [AtrasosPage]
})
export class AtrasosPageModule {}
