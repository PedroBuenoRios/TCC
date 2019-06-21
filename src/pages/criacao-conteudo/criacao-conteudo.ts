import { UsersProvider } from './../../providers/users/users';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, DateTime } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the CriacaoConteudoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-criacao-conteudo',
  templateUrl: 'criacao-conteudo.html',
})
export class CriacaoConteudoPage {

  titulo: any;
  tag: any;
  tags: any[] = [];
  descricao: any;
  autor: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: UsersProvider,
    public storage: Storage) {
    this.storage.get('perfil').then((data => {
      this.autor = data;
      console.log(this.autor);
    }));
  }

  adicionaTag() {
    if (this.tag != "") {
      this.tags.push(this.tag);
      this.tag = "";
    }
  }

  criar() {
    console.log(this.titulo);
    let a = {
      titulo: this.titulo,
      tags: this.tags,
      descricao: this.descricao,
      autor: this.autor
    }
    this.http.criarSugestao(a)
      .subscribe(data => {
        console.log(data)
        this.navCtrl.pop();
      }, error => {
        console.log(error);
      });

  }

}
