import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagarFase1 } from './pagar-fase1';

@NgModule({
  declarations: [
    PagarFase1,
  ],
  imports: [
    IonicPageModule.forChild(PagarFase1),
  ],
  exports: [
    PagarFase1
  ]
})
export class PagarFase1Module {}
