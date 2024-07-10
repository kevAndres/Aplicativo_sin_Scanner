import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaguinaprincipalrepresentantePageRoutingModule } from './paguinaprincipalrepresentante-routing.module';

import { PaguinaprincipalrepresentantePage } from './paguinaprincipalrepresentante.page';
import { VistaUsuarioComponent } from 'src/Component/VistaUsuario/vista-usuario/vista-usuario.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaguinaprincipalrepresentantePageRoutingModule
  ],
  declarations: [PaguinaprincipalrepresentantePage, VistaUsuarioComponent]
})
export class PaguinaprincipalrepresentantePageModule {}
