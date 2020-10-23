import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

import { turno } from '../models/turno';
import { servicio } from '../models/servicio';
import { usuario } from '../models/usuario';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

/////////////////////

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/////////////////////


const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

const PDF_EXTENSION = '.pdf';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  @ViewChild('content') content:ElementRef;
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  @ViewChild('content1') content1:ElementRef;
  @ViewChild('TABLE1', { static: false }) TABLE1: ElementRef;
  @ViewChild('content2') content2:ElementRef;
  @ViewChild('TABLE2', { static: false }) TABLE2: ElementRef;
  @ViewChild('content3') content3:ElementRef;
  @ViewChild('TABLE3', { static: false }) TABLE3: ElementRef;

  @ViewChild('content') element: ElementRef;

  turno:turno[];

  servicio: any;
  servicio1: any;
  servicio2: any;
  servicio3: any;
  filterPost = '';
  serviciosearch: any;






  constructor(private serviceService: ServiceService,
    private auth: AuthenticationService,
              private router: Router
              ) { }

  ngOnInit(): void {
    this.leerturnosfecha();
    this.leerturnos();
    this.leerentradassalidassistema();
    this.leeratencionusuario();
    /////
    this.getfiltrofecha();

  }

  salir(){

    this.auth.logout();
    this.router.navigateByUrl('/');

  }

  leerturnosfecha(){
    this.serviceService.getturnosfecha().subscribe((servicio1: any) => {
      //console.log(servicio1.turnos);
      this.servicio1 = servicio1.turnos;

    });
  }

  leerturnos(){
    this.serviceService.getturnos().subscribe((servicio: any) => {
      //console.log(servicio.turnos);
      this.servicio = servicio.turnos;

    });
  }


  leerentradassalidassistema(){
    this.serviceService.getentradassalidasistema().subscribe((servicio2: any) => {
      //console.log(servicio2.turnos);
      this.servicio2 = servicio2.turnos;

    });
  }

  leeratencionusuario(){
    this.serviceService.getatencionusuario().subscribe((servicio3: any) => {
      //console.log(servicio3.turnos);
      this.servicio3 = servicio3.turnos;

    });
  }




    //excel
    ExportTOExcel() {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb,  'entradassalidas' + '_export_' + new  Date().toLocaleString() + EXCEL_EXTENSION);
    }

    ExportTOExcel1() {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE1.nativeElement);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'turnofecha' + '_export_' + new  Date().toLocaleString() + EXCEL_EXTENSION);
    }
    ExportTOExcel2() {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE2.nativeElement);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'turnopromatencion' + '_export_' + new  Date().toLocaleString() + EXCEL_EXTENSION);
    }

    ExportTOExcel3() {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE3.nativeElement);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'atencionusuario' + '_export_' + new  Date().toLocaleString() + EXCEL_EXTENSION);
    }

    /////pdf

    generarPDF(){
      html2canvas(document.getElementById('content1'), {
         // Opciones
         allowTaint: true,
         useCORS: false,
         // Calidad del PDF
         scale: 1
      }).then(function(canvas) {
      var img = canvas.toDataURL("image/png");
      var doc = new jsPDF();
      //doc.addImage(img,'JPG',8, 10, 200, 275);
      //doc.save('prueba.pdf');

      doc.text('content1', 10, 10)
      doc.save('a4.pdf')
     });
  }

  generarPDF1(){
    let data = document.getElementById('content1');
    html2canvas(data).then(canvas =>{
      var imgData = canvas.toDataURL('image/png');
      var imgWidth = 210;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      var doc = new jsPDF('p', 'mm');
      var position = 0; // give some top padding to first page

      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position += heightLeft - imgHeight; // top padding for other pages
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save( 'turnofecha.pdf');
    })
  }

  generarPDF2(){
    let data = document.getElementById('content2');
    html2canvas(data).then(canvas =>{
      var imgData = canvas.toDataURL('image/png');
      var imgWidth = 210;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      var doc = new jsPDF('p', 'mm');
      var position = 0; // give some top padding to first page

      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position += heightLeft - imgHeight; // top padding for other pages
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save( 'tiempopromedioatencion.pdf');
    })
  }

  generarPDF3(){
    let data = document.getElementById('content3');
    html2canvas(data).then(canvas =>{
      var imgData = canvas.toDataURL('image/png');
      var imgWidth = 210;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      var doc = new jsPDF('p', 'mm');
      var position = 0; // give some top padding to first page

      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position += heightLeft - imgHeight; // top padding for other pages
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save( 'entradassalidas.pdf');
    })
  }
  generarPDF4(){
    let data = document.getElementById('content4');
    html2canvas(data).then(canvas =>{
      var imgData = canvas.toDataURL('image/png');
      var imgWidth = 210;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      var doc = new jsPDF('p', 'mm');
      var position = 0; // give some top padding to first page

      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position += heightLeft - imgHeight; // top padding for other pages
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save( 'atencionusuario.pdf');
    })
  }

  //////////////////////filtro

//FILTRO PARA LA TABLA

getfiltrofecha(){
  //getfiltroturnosfecha()



  let fecha = (<HTMLInputElement>document.getElementById('start')).value;
  console.log('esto es la fecha: ', fecha);

  this.serviceService.getfiltroturnosfecha(fecha).subscribe((serviciosearch: any) => {
    //console.log(serviciosearch.turnos);
    this.serviciosearch = serviciosearch.turnos;


  });




}



  //////////////////////////////

    ////////









}
