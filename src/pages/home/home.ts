import { ConteudoPage } from './../conteudo/conteudo';
import { CriacaoConteudoPage } from './../criacao-conteudo/criacao-conteudo';
import { TemaPage } from './../tema/tema';
import { Component } from '@angular/core';
import { NavController, ModalController, ViewController} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public user: {
    email: string,
    senha: string,
    isLogado: boolean
  }
  public slides: Array<{titulo: string, 
                        imagem: string}>;

  public items: any[];

  constructor(  public navCtrl: NavController,public modalCtrl: ModalController,
                public viewCtrl: ViewController){    
   this.user  = {
     email: "",
     senha: "",
     isLogado: false
   }
    this.slides = [
      {
        titulo: "Slides 1",
        imagem: "assets/imgs/esportes.png"
      },
      {
        titulo: "Slides 2",
        imagem: "assets/imgs/esportes.png"
      }
    ];

    this.items = [];
  }


}
