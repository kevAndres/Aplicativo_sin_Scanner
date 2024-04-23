import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaguinainicialPageRoutingModule } from './paguinainicial-routing.module';

import { PaguinainicialPage } from './paguinainicial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaguinainicialPageRoutingModule
  ],
  declarations: [PaguinainicialPage]
})
export class PaguinainicialPageModule {}
