import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import  { Observable } from 'rxjs';
//////////////////////////////////////
import { usuario } from '../models/usuario';
import { turno } from '../models/turno';
import { servicio } from '../models/servicio';
import { evaluacion } from '../models/evaluacion';



@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private URL = "http://127.0.0.1:3000";
  // private URL = "https://backendftt.herokuapp.com";


  constructor(private http: HttpClient,
    private router: Router) { }

/*
    getusuarios(): Observable<usuario[]> {
      return this.http.get<usuario[]>(this.URL + "/usuarios");
    }
 */

      /*   USUARIOS  */
    getturnosfecha(): Observable<servicio[]> {
      return this.http.get<servicio[]>(this.URL + "/turnosfecha");
    }

    getturnos(): Observable<servicio[]> {
      return this.http.get<servicio[]>(this.URL + "/tiempopromedioatencion");
    }

    getentradassalidasistema(): Observable<servicio[]> {
      return this.http.get<servicio[]>(this.URL + "/entradasalidasistema");
    }

    getatencionusuario(): Observable<servicio[]> {
      return this.http.get<servicio[]>(this.URL + "/atencionusuario");
    }
     getfiltroturnosfecha(fecha):Observable<servicio[]> {
      return this.http.get<servicio[]>(this.URL + "/turnosfecha/"+ fecha);
    }

    /*  */

    /* EVALUACION */
    getprmediosservicios(): Observable<servicio[]> {
      return this.http.get<servicio[]>(this.URL + "/promedios");
    }

    getmaxminservicios(): Observable<servicio[]> {
      return this.http.get<servicio[]>(this.URL + "/maximosminimos");
    }

    getprmediosempleado(): Observable<servicio[]> {
      return this.http.get<servicio[]>(this.URL + "/promediose");
    }

    getmaxminempleado(): Observable<servicio[]> {
      return this.http.get<servicio[]>(this.URL + "/maximosminimose");
    }

    getgraficobarras(): Observable<servicio[]> {
      return this.http.get<servicio[]>(this.URL + "/graficobarras");
    }

    getgraficopastel(): Observable<servicio[]> {
      return this.http.get<servicio[]>(this.URL + "/graficopastel");
    }

    getestablecimiento(): Observable<servicio[]> {
      return this.http.get<servicio[]>(this.URL + "/establecimiento");
    }

    getevalgrupo(): Observable<servicio[]> {
      return this.http.get<servicio[]>(this.URL + "/evaluaciongrupos");
    }

    /*  */

    /* ATENCION */
    gettiemposcompletos(): Observable<servicio[]> {
      return this.http.get<servicio[]>(this.URL + "/tiemposcompletos");
    }

    getpromatencion(): Observable<servicio[]> {
      return this.http.get<servicio[]>(this.URL + "/promediosatencion");
    }

    getmaxatencion(): Observable<servicio[]> {
      return this.http.get<servicio[]>(this.URL + "/maxatencion");
    }

    getatencionservicio(): Observable<servicio[]> {
      return this.http.get<servicio[]>(this.URL + "/atencionservicio");
    }

    getatenciongrafico(): Observable<servicio[]> {
      return this.http.get<servicio[]>(this.URL + "/graficoservicio");
    }

    /*  */


    /* SATISFACCIONES */
    /*  */

    /* OCUPACION */
    getocupacionservicios(): Observable<servicio[]> {
      return this.http.get<servicio[]>(this.URL + "/ocupacionservicios");
    }

    getgraficoocupacion(): Observable<servicio[]> {
      return this.http.get<servicio[]>(this.URL + "/graficoocupacion");
    }




    /* DISTRIBUCION Y ESTADO DE TURNOS */
    getdistribucionturnos(): Observable<servicio[]> {
      return this.http.get<servicio[]>(this.URL + "/distestadoturno");
    }

    /*  */

    /*INGRESO DE CLIENTES  */
    getingresoclientes(): Observable<servicio[]> {
      return this.http.get<servicio[]>(this.URL + "/ingresoclientes");
    }

    /*  */

    /* ATENDIDOS MULTIPLES */
    getatendidosmultiples(): Observable<servicio[]> {
      return this.http.get<servicio[]>(this.URL + "/atendidosmultiples");
    }
  /*  */



  /* graficos menu */
  getatencionusuariomenu(fecha):Observable<servicio[]> {
    return this.http.get<servicio[]>(this.URL + "/graficoocupacion/"+ fecha);
  }

  getpromediosatencionmenu(fecha):Observable<servicio[]> {
    return this.http.get<servicio[]>(this.URL + "/promediosatencionmenu/"+ fecha);
  }

  getingresoclientesmenu(fecha):Observable<servicio[]> {
    return this.http.get<servicio[]>(this.URL + "/ingresoclientesmenu/"+ fecha);
  }

  /////////////////////////////////
  //GRAFICOS EXTRA MENU
  ////////////////////////////////
  gettotaltickets(fecha):Observable<servicio[]> {
    return this.http.get<servicio[]>(this.URL + "/totaltickets/"+ fecha);
  }
  gettotalatendidos(fecha):Observable<servicio[]> {
    return this.http.get<servicio[]>(this.URL + "/totalatendidos/"+ fecha);
  }
  gettotalsinatender(fecha):Observable<servicio[]> {
    return this.http.get<servicio[]>(this.URL + "/totalsinatender/"+ fecha);
  }
  getpromedioatencion(fecha):Observable<servicio[]> {
    return this.http.get<servicio[]>(this.URL + "/promedioatencion/"+ fecha);
  }

  /////////////////////////////
  getgrafeva():Observable<servicio[]> {
    return this.http.get<servicio[]>(this.URL + "/evagraf");
  }

  getserviciossolicitados():Observable<servicio[]> {
    return this.http.get<servicio[]>(this.URL + "/servsoli");
  }


}


