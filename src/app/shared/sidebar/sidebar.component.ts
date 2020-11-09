import { Component, OnInit } from '@angular/core';
import { usuario } from '../../models/usuario';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public usuario: usuario;




  constructor(private authService: AuthenticationService) {
    //this.usuario = usuarioService.usuario;
    this.usuario = authService.user;

   }

  ngOnInit(): void {

  }
}

