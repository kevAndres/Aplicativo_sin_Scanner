import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VistaEsquelaRepresentantePageRoutingModule } from './vista-esquela-representante-routing.module';
import { VistaEsquelaRepresentantePage } from './vista-esquela-representante.page';
import { VistaEsquelaComponent } from '../../Component/VistaEsquela/vista-esquela/vista-esquela.component';
import { FullscreenImageModalComponent } from '../../Component/VistaEvidenciaFull/fullscreen-image-modal/fullscreen-image-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VistaEsquelaRepresentantePageRoutingModule,
  ],
  declarations: [
    VistaEsquelaRepresentantePage,
    VistaEsquelaComponent,
    FullscreenImageModalComponent,
  ],
})
export class VistaEsquelaRepresentantePageModule {}
