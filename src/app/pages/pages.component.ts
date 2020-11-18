import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {



  mostrarMenu:boolean = true;
  //mySidebar:boolean= true;

  constructor() { }

  ngOnInit(): void {
    customInitFunctions();
  }




  w3_close() {

    //document.getElementById("menu-lateral").style.display = "none";

    if(screen.width < 1024){
      console.log('pequenia');
      document.getElementById("menu-lateral").style.display = "none";
    }else{
      if( screen.width < 1280 ){
        console.log('mediana');
        document.getElementById("menu-lateral").style.display = "block";
      }else{
        console.log('wrande');
        document.getElementById("menu-lateral").style.display = "block";
      }

    }


//     if (screen.width < 1024)
//    console.log('pequenia');
// else
//    if (screen.width < 1280)
//       console.log('mediana');
//    else
//       console.log('wrande');


  }

}
