import { Component, OnInit, ViewChild } from '@angular/core';
//import * as $ from 'jquery' para usar jquery
declare const $:any; // cada vez que se un puliggn de jQuery declarar '$' en any para que peuda funcionar el puling

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public widthSlider: number
  public widthToSlider:number
  public autor:any;
  @ViewChild('textos', {static: true}) textos
  
  constructor() { }

  ngOnInit(){
      var opcionClasica = document.querySelector('#texto').innerHTML
      console.log(this.textos.nativeElement.textContent)
  }
  cargarSlider(){
      this.widthToSlider = this.widthSlider
  }
  resetearSlider(){
    this.widthToSlider = null
  }

  getAutorInContact(event){
    console.log(event)
      this.autor = event
  }

}
