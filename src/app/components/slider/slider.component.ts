import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
declare const $:any

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  @Input() anchura:number

  @Output() getAutor =  new EventEmitter()
  
  public autor:any

  constructor() {

    this.autor = {
      nombre: 'Javier Pérez',
      website: 'jfreelnace.com',
      email: 'j.alexis.p18@gmail.com'
    }
   }

  ngOnInit(): void {
      $('.logo').click(function(e) {
          e.preventDefault()
          $('header').css('background', 'green');
      });

      $('.galeria').bxSlider({
        mode: 'fade',
        captions: true,
        slideWidth: this.anchura
      })
  }

  lanzar(event){
    console.log(event)
      this.getAutor.emit(this.autor)
  }

}
