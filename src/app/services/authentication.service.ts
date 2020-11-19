import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import  { Observable } from 'rxjs';
import { usuario } from '../models/usuario';

import { map, catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  userToken: String;
  public user: usuario;
  username: '';
  password: '';


   private URL = "https://backendftt.herokuapp.com";
  // private URL = "http://127.0.0.1:3000";




  constructor(private http: HttpClient,
    private router: Router) {

      this.leerToken();
      this.obtenerUsuario();

    }


    logout(){
      localStorage.removeItem('token');
    }



  loginUsuario(username:any,password:any){
    //return this.http.post<any>(this.URL + '/login');
    return this.http.post<any>(`${this.URL}/login/${username}/${password}`, {});
    //this.router.navigateByUrl('/menu');
    //postmaster/admin123
  }

  login(username:any,password:any){

    return this.http.post<any>(`${this.URL}/login/${username}/${password}`, {})
      .pipe(
         map( resp => {
           this.guardaToken( resp['token'] );
           //return resp;
         } )
      );


  }

  private guardaToken( token: string ){

    this.userToken = token;
    localStorage.setItem('token', token);

  }

  leerToken() {

    if( localStorage.getItem('token') ){
      this.userToken = localStorage.getItem('token')
    }else{
      this.userToken = '';
    }

    return this.userToken;


  }

  estaAutenticado(): boolean{

    return this.userToken.length > 2;

  }





  obtenerUsuario(){
    let token= localStorage.getItem('token');
    //console.log(token);
  }










}
