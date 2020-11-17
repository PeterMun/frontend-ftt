import { Component, OnInit } from '@angular/core';

declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  mostrarMenu:boolean = true;

  constructor() { }

  ngOnInit(): void {
    customInitFunctions();
  }

  w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    //document.getElementById("myOverlay").style.display = "none";
  }

}
