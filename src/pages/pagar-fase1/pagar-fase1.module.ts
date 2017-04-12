import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PagarFase1 } from './pagar-fase1';

@NgModule({
  declarations: [
    PagarFase1,
  ],
  imports: [
    IonicModule.forChild(PagarFase1),
  ],
  exports: [
    PagarFase1
  ]
})
export class PagarFase1Module {}
