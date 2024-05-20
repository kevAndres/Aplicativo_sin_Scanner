import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AtrasosPageRoutingModule } from './atrasos-routing.module';

import { AtrasosPage } from './atrasos.page';
import { ScannerQRComponent } from 'src/Component/ScannerQR/scanner-qr/scanner-qr.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AtrasosPageRoutingModule,
    
  ],
  declarations: [AtrasosPage,ScannerQRComponent]
})
export class AtrasosPageModule {}
