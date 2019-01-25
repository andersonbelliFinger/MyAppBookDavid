import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'modal-status',
  templateUrl: 'status.html',
})
export class StatusModal {

	public all = true;
	public selected = [];

  constructor(public nav: NavController, public view: ViewController, public params: NavParams) {
    this.selected = params.get('status');
    this.all = this.selected.length == 8;
  }

  close() {
    this.view.dismiss({ 'status' : this.selected });
  }

  set(item){
  	let index = this.selected.indexOf(item);
  	if(index != -1){
  		this.selected.splice(index, 1); 
  		this.all = false;
  	} else {
  		this.selected.push(item);
  		if(this.selected.length == 8)
  			this.all = true;
  	}
  }

  selectAll(){
  	if(this.all){
  		this.selected = [];
  		this.all = false;
  	} else {
  		this.selected = [
				"spinner",
				"times",
				"thumbs-up",
				"check",
				"ban",
				"thumbs-down",
				"hourglass-start",
				"clock-o",
			];
			this.all = true;
  	}
  }

}