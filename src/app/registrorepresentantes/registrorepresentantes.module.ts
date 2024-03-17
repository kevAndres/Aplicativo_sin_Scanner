import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrorepresentantesPageRoutingModule } from './registrorepresentantes-routing.module';

import { RegistrorepresentantesPage } from './registrorepresentantes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrorepresentantesPageRoutingModule
  ],
  declarations: [RegistrorepresentantesPage]
})
export class RegistrorepresentantesPageModule {}
