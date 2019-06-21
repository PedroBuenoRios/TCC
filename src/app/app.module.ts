import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
//import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { UsersProvider } from '../providers/users/users';
import { CadastroPage } from './../pages/cadastro/cadastro';
import { ConteudoPage } from './../pages/conteudo/conteudo';
import { CriacaoConteudoPage } from './../pages/criacao-conteudo/criacao-conteudo';
import { EventoPage } from './../pages/evento/evento';
import { HistoricoPage, ListaPage } from './../pages/historico/historico';
import { PerfilPage } from './../pages/perfil/perfil';
import { FiltrarPage, TemaPage } from './../pages/tema/tema';
import { MyApp } from './app.component';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CadastroPage,
    ListaPage,
    TabsPage,
    TemaPage,
    ConteudoPage,
    HistoricoPage,
    CriacaoConteudoPage,
    EventoPage,
    PerfilPage,
    FiltrarPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
    IonicStorageModule.forRoot({name:'perfil'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CadastroPage,
    TabsPage,
    ListaPage,
    TemaPage,
    ConteudoPage,
    HistoricoPage,
    CriacaoConteudoPage,
    EventoPage,
    PerfilPage,
    FiltrarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsersProvider
    //FileTransfer
  ]
})
export class AppModule {
}
