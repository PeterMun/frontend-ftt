import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm} from '@angular/forms';
import { ServiceService } from '../services/service.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { usuario } from '../models/usuario';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario: usuario = new usuario();

  usua_login: "";
  usua_password: "";
  mostrar = true;


  constructor(private serviceService: ServiceService,

    //inyeccion de dependencias
    private authenticationService: AuthenticationService,
    public router: Router) { }

  ngOnInit(): void {
  }


//     //sacar info con el jwt y guardar en el localstorage; mandar todas las peticiones
      login(username, password) {
        username = this.usua_login;
        password = this.usua_password;

        this.authenticationService.loginUsuario(username, password).subscribe((a) => {
          console.log(a.token);
          localStorage.setItem("token", a.token);
          this.router.navigateByUrl('/menu');




        });

      }

      login1(form: NgForm, username, password){
        username = this.usua_login;
        password = this.usua_password;
        if(form.invalid){return;}

        Swal.fire({
          allowOutsideClick: false,
          //title: 'Success!',
          text: 'Espere un momento.....',
          //icon: 'error',
          //confirmButtonText: 'Cool'
    /*       type: 'info',
          text: 'Espere por favor.....' */
        });
        Swal.showLoading();


        this.authenticationService.loginUsuario(username, password)
        .subscribe(resp => {
          console.log(resp.token);
          localStorage.setItem("token", resp.token);
          this.router.navigateByUrl('/menu');
          Swal.close();
          //console.log(resp);
          //console.log(form);

        }, (err) => {
          console.log(err.error.error.message);
          Swal.fire({
            allowOutsideClick: false,
            title: 'Error!',
            text: 'Usuario o password incorrecto',
            icon: 'error',
            confirmButtonText: 'ok'
      /*       type: 'info',
            text: 'Espere por favor.....' */
          });
        })
/*         if(form.invalid){return;}
        console.log(this.usuario);
        console.log(form); */
      }

}
