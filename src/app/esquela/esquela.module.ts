import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EsquelaPageRoutingModule } from './esquela-routing.module';

import { EsquelaPage } from './esquela.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EsquelaPageRoutingModule
  ],
  declarations: [EsquelaPage]
})
export class EsquelaPageModule {}
