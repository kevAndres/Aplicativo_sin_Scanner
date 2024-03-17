import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrodocentesPageRoutingModule } from './registrodocentes-routing.module';

import { RegistrodocentesPage } from './registrodocentes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrodocentesPageRoutingModule
  ],
  declarations: [RegistrodocentesPage]
})
export class RegistrodocentesPageModule {}
