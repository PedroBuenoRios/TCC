import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the EventosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventosProvider {

  private url = "http://localhost:3000/eventos";

  constructor(public http: HttpClient) {
    console.log('Hello EventosProvider Provider');
  }

  cadastrar(evento){
    let headers = new HttpHeaders();
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');
      return this.http.post(this.url,evento);
  }

  getAll(){
    return new Promise((resolve, reject)=>{
      //retorna um array com todos os eventos
      this.http.get(`${this.url}`)
      .subscribe(data => {
        //se houver alguma coisa nesse array
        //significa que há eventos e resolve a Promise
        if(data !=0 ) resolve(data);
        //se não houver significa que não eventos e rejeita a Promise
        else reject('Não há eventos com este ID');
      },
      //Houve algum erro na hora de buscar pelos eventos
      err => reject(err));
    });
  }

  getByAutorID(autorID){
    return new Promise((resolve, reject)=>{
       //retorna um array de eventos que contenham o id do ususário passado
       //e ordena eles pelo id do evento
      this.http.get(`${this.url}?autorID=${autorID}&_sort=data_Criacao`)
      .subscribe(data => {
        //se houver alguma coisa nesse array
        //significa que há eventos criados pelo usuário
        // e resolve a Promise 
        if(data !=0 ) resolve(data[0]);
        //se não houver alguma coisa significa que o usuário não evento algum
        // e rejeita a promise
        else reject('Este usuário não criou nenhum evento ainda');
      }, 
      //Houver algum erro na hora de buscar pelo evento
      error => reject(error));
    });
  }

  getByTag(tag){
    return new Promise<Object>((resolve, reject)=>{
      //retorna um array de eventos que contenham a tag passada
      //e ordena eles pelo id do evento
     this.http.get(`${this.url}?tag=${tag}&_sort=data_Criacao`)
     .subscribe(data => {
       //se houver alguma coisa nesse array
       //significa que há eventos com essa tag
       // e resole a Promise retornando o vetor inteiro
       if(data !=0 ) resolve(data);
       //se não houver alguma coisa significa não há eventos com essa tag
       // e rejeita a Promise
       else reject('Este usuário não criou nenhum evento ainda');
     }, 
     //Houver algum erro na hora de buscar pelo evento
     error => reject(error));
   });
  }

  getById(id){
    return new Promise((resolve, reject)=>{
      //retorna um array de eventos que contenham o id
      this.http.get(`${this.url}/${id}`)
      .subscribe(data => {
        //se houver alguma coisa nesse array
        //significa que há algum evento com esse id
        // e resolve a Promise
        if(data !=0 ) resolve(data[0]);
        //se não houver significa que não há eventos com esse id
        // e rejeita a Promise
        else reject('Não há eventos com este ID')
      },
      //Houve algum erro na hora de buscar pelo evento
      err => reject(err));
    });
  }
}
