import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Qrcode } from './qrcode';

@NgModule({
  declarations: [
    Qrcode,
  ],
  imports: [
    IonicPageModule.forChild(Qrcode),
  ],
  exports: [
    Qrcode
  ]
})
export class QrcodeModule {}
