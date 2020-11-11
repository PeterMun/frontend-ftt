import { Component, OnInit, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

declare function customSidebar();

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: {
    "(window:click)": "onClick()"
  }

})
export class HeaderComponent implements OnInit {

  isMenuOpen = true;


  constructor(
    private serviceService: ServiceService,
    private auth: AuthenticationService,
              private router: Router,
              private ele: ElementRef, private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    customSidebar();
  }

  salir(){

    this.auth.logout();
    this.router.navigateByUrl('/');

  }

  toggleMenu($event) {
    $event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
  }

  onClick() {
    this.isMenuOpen = false;
    window.location.reload();
  }

  // @HostListener('click') onClick() {
  //   let iconmenu = document.getElementById('iconmenu')
  //   if(!iconmenu){
  //     //window.alert('Element clicked!');
  //   }

  //   }
}
