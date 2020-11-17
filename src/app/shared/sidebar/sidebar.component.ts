import { Component, HostListener, OnInit,ElementRef, EventEmitter, Output } from '@angular/core';
import { usuario } from '../../models/usuario';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { ServiceService } from '../../services/service.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  // host: {
  //   "(window:click)": "onClick()"
  // }
})
export class SidebarComponent implements OnInit {

  public usuario: usuario;

  public text: String;

  isMenuOpen = true;




  constructor(
    private serviceService: ServiceService,

    //inyeccion de dependencias
    private authenticationService: AuthenticationService,
    public router: Router,
    private eRef: ElementRef
  ) {
    this.text = 'no clicks yet';

   }

  ngOnInit(): void {

    this.datatoken();
    //this.usuario = this.authenticationService.user;
    //console.log(usuario);

  }



  datatoken(){

    let token =  localStorage.getItem("token");


    //console.log(token);



  }


/*   toggleMenu($event) {
    $event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
  }

  onClick() {
    this.isMenuOpen = false;
  } */


  // @HostListener('document:click', ['$event'])
  // clickout(event) {
  //   let nav = document.getElementById('sidenav');


  //   if(this.eRef.nativeElement.contains(event.target)) {
  //     this.text = "clicked inside";


  //     console.log(nav);
  //   } else {
  //     this.text = "clicked outside";
  //     nav.addEventListener('click', function(e) {
  //       e.stopPropagation();
  //       console.log('click funcionando');

  //   });

  //     console.log('click fuera del menu');
  //     //nav.style.display="none";

  //   }
  // }




}

