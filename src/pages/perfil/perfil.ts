import { HistoricoPage } from './../historico/historico';
import { UsersProvider } from './../../providers/users/users';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { App } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  perfil: any = {
    nome:"",
    email:""
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public alertCtrl: AlertController,
    public http: UsersProvider,
    public modalCtrl:ModalController,
    public appCtrl: App) {
    this.storage.get('perfil')
    .then((data) => {
        console.log(data);
        this.perfil = data;
        console.log(
          data.nome + "\n"
          + data.email);
      });
  }
  logout() {
    console.log(this.perfil.id);
    this.http.query("?id=" + this.perfil.id).
      subscribe((data) => {
        console.log(data);
        this.storage.remove('perfil');
        this.appCtrl.getRootNav().setRoot(LoginPage);
      },
        (err) => {
          console.log(err);
        });
  }
  historico(){
    this.navCtrl.push(HistoricoPage,{id:this.perfil.id});
  }
}
