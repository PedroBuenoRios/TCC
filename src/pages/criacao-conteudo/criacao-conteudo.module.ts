import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CriacaoConteudoPage } from './criacao-conteudo';

@NgModule({
  declarations: [
    CriacaoConteudoPage,
  ],
  imports: [
    IonicPageModule.forChild(CriacaoConteudoPage),
  ],
})
export class CriacaoConteudoPageModule {}
