import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NavController, NavParams, Events, ModalController, LoadingController } from 'ionic-angular';

import { StatusModal } from '../modal/status';
import { Profissional } from '../../provider/profissional';
import { Funcionario } from '../../provider/funcionario';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public data = new Date().toISOString();
  public profissional: Profissional;
  public funcionario;
  public icons = [
    "spinner",
    "times",
    "thumbs-up",
    "check",
    "ban",
    "thumbs-down",
    "hourglass-start",
    "clock-o",
  ];
  public items;
  public item = 'time';
  public time = true; // false - ASC; true - DESC
  public name = false;

  constructor(
    public http: Http, 
    public param: NavParams, 
    public modal: ModalController,
    public event: Events,
    public load: LoadingController
  ) {

    this.profissional = param.get('profissional');
    this.funcionario  = param.get('funcionario');
    let data = sessionStorage.getItem('data');
    if(data){
      this.data = new Date(data).toISOString();
    }

    this.get();
  }

  get(){

    let options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }) });
    let data    = this.data.replace('T', ' ').substring(0, 19);
    this.items = [];

    sessionStorage.setItem('data', data);

    let loading = this.load.create({ content: "Searching..." });
    loading.present();

    this.http.post(
      'https://clientes.fingerprint.com.br/kort/admin/agendamento_ajax.php', 
      { 
        d : data,
        e : this.profissional.id_empresa,
        p : this.profissional.id_profissional,
        i : [ (this.funcionario ? this.funcionario : this.profissional.id_profissional) ],
      },
      options
    )
    .subscribe(
      data => {
        loading.dismissAll();
        let response = JSON.parse(data["_body"]);
        if(response.success){
          let data = response.data[0];
          if(data){
            for(let i = 0; i < data.agendamento.length; i++){
              let agendamento = data.agendamento[i];
              this.items.push({
                color: '5px solid ' + agendamento.cor.border,
                time: agendamento.inicio.substring(11, 16) + "~" + agendamento.fim.substring(11, 16),
                name: agendamento.cliente,
                service: agendamento.servico,
                status: agendamento.status.substring(3)
              })
            }
          }
        } else {
          alert(response.msg);
        }
      },
      err => {
        loading.dismissAll();
        console.log(err);
      }
    );

  }

  status(){
    let modal = this.modal.create(StatusModal, {status: this.icons});
    modal.present();

    modal.onDidDismiss(data => {  
      this.icons = data.status;
    });
  }

  changeDate(day){
    let data = new Date(this.data);
    data.setDate(data.getDate() + day)
    this.data = data.toISOString();

    this.get();
  }

  byTime(){
    this.item = 'time';
    this.items = this.sortName(this.time);
  }

  byName(){
    this.item = 'name';
    this.items = this.sortName(this.name);
  }

  sortName(desc = false){
    let item    = this.item;
    let another = this.items.slice(0);
    another.sort(function(a,b) {
      var x = a[item].toLowerCase();
      var y = b[item].toLowerCase();
      if(desc){ // decrescent
        return x > y ? -1 : x < y ? 1 : 0;
      }
      return x < y ? -1 : x > y ? 1 : 0;
    });
    this.time = item == 'time' ? !desc : false;
    this.name = item == 'name' ? !desc : false;
    return another;
  }

  style(icon){
    switch (icon) {
      case 'times':
      case 'ban':
      case 'thumbs-down':
        return 'danger';
      
      case 'thumbs-up':
      case 'check':
        return 'secondary';

      default:
        return 'primary';
    }
  }

}
