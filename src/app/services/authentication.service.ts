import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import  { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userToken: string;


  private URL = "https://backendftt.herokuapp.com";
  //private URL = "http://127.0.0.1:3000";



  constructor(private http: HttpClient,
    private router: Router) { }


    logout(){

    }



  loginUsuario(username:any,password:any){
    //return this.http.post<any>(this.URL + '/login');
    return this.http.post<any>(`${this.URL}/login/${username}/${password}`, {});
    this.router.navigateByUrl('/menu');
    //postmaster/admin123
  }





  // estaAutenticado(): boolean{


  // }


}
