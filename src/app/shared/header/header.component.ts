import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

declare function customSidebar();

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private serviceService: ServiceService,
    private auth: AuthenticationService,
              private router: Router
  ) { }

  ngOnInit(): void {
    customSidebar();
  }

  salir(){

    this.auth.logout();
    this.router.navigateByUrl('/');

  }

}
