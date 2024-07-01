import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllAtrasosPageRoutingModule } from './all-atrasos-routing.module';

import { AllAtrasosPage } from './all-atrasos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllAtrasosPageRoutingModule
  ],
  declarations: [AllAtrasosPage]
})
export class AllAtrasosPageModule {}
