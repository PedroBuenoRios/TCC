import { UsersProvider } from './../../providers/users/users';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-conteudo',
  templateUrl: 'conteudo.html',
})
export class ConteudoPage {

  item: any = {};
  descricao: any;
  comentarios: any;
  autor: any;
  sugestao: any;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public http: UsersProvider) {
    this.item = this.navParams.get('evento');
  }
  
  ionViewDidEnter(){
    this.http.query("sugestoes?id=" + this.item.id).subscribe((data) => {
      this.sugestao = data[0];
      console.log(data[0]);
    });
    this.storage.get('perfil').then((data) => {
      this.autor = data;
      console.log(data)
    });
    this.atualizaComentarios();
  }
  atualizaComentarios(){
    this.http.query("comentarios").subscribe((data) => {
      this.comentarios = data;
      console.log(data)
    });
  }
  comentar() {
    if(this.descricao == "") return;
    let comentario = {
      autor: this.autor,
      sugestao: this.sugestao,
      descricao: this.descricao,
      data: new Date().toUTCString()
    }
    console.log(comentario);
    this.http.comentar(comentario).subscribe((data) => {
      this.atualizaComentarios();
      console.log(data);
    });
    this.descricao = "";
  }

}
