import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private auth: AuthenticationService,
              private router: Router ){}

  canActivate():  boolean {
    console.log('guard');
    if( this.auth.estaAutenticado() ){
      return true;
    }else{

      this.router.navigateByUrl('/');
      return false;


    }
    // return this.auth.estaAutenticado();
  }

}
