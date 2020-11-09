export class usuario{

  constructor(
    public usua_login: string,
    public usua_password: string,
    public empr_codigo?: number,
    public usua_codigo?: number,
    public usua_nombre?: string,
    public usua_estado?: number,
    public usua_tipo?: number
  ){}

  imprimirUsuario(){
    console.log( this.usua_login );
  }



//   empr_codigo:number;
//   usua_codigo:number;
//   usua_nombre:string;
//   usua_login:string;
//   usua_password:string;
//   usua_estado:number;
//   usua_tipo:number;
// //////
//   reg_fecha:Date;
//   reg_hora:number;
//   reg_minuto:number;
//   reg_estado:string;

//   razon:string;





}
