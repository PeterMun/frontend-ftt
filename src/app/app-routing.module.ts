import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/////
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { EvaluacionComponent } from './evaluacion/evaluacion.component';
import { AtencionComponent } from './atencion/atencion.component';
import { OcupacionComponent } from './ocupacion/ocupacion.component';
import { DistestadoturnosComponent } from './distestadoturnos/distestadoturnos.component';
import { IngresoclientesComponent } from './ingresoclientes/ingresoclientes.component';
import { AtendidosmultiplesComponent } from './atendidosmultiples/atendidosmultiples.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'menu', component:MenuComponent, canActivate: [ AuthGuard ]},
  {path:'usuarios', component:UsuariosComponent, canActivate: [ AuthGuard ]},
  {path:'evaluacion', component:EvaluacionComponent, canActivate: [ AuthGuard ]},
  {path:'atencion', component:AtencionComponent, canActivate: [ AuthGuard ]},
  {path:'ocupacion', component:OcupacionComponent, canActivate: [ AuthGuard ]},
  //aqui va satisfacciones
  {path:'distestadoturnos', component:DistestadoturnosComponent, canActivate: [ AuthGuard ]},
  {path:'ingresoclientes', component:IngresoclientesComponent, canActivate: [ AuthGuard ]},
  {path:'atendidosmultiples', component:AtendidosmultiplesComponent, canActivate: [ AuthGuard ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
