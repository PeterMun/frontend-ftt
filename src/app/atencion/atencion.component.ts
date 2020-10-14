import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js' ;
import { ServiceService } from '../services/service.service';
import { servicio } from '../models/servicio';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';



@Component({
  selector: 'app-atencion',
  templateUrl: './atencion.component.html',
  styleUrls: ['./atencion.component.scss']
})
export class AtencionComponent implements OnInit {


  @ViewChild('content') content:ElementRef;
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  @ViewChild('content1') content1:ElementRef;
  @ViewChild('TABLE1', { static: false }) TABLE1: ElementRef;


  servicio: any;
  serviciopa: any;
  serviciomax:any;
  servicioatser: any;
  serviciograf: any;



  constructor(private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.leertiempcompleto();
    this.leerpromatencion();
    this.leermaxatencion();
    this.leeratencionservicio();
    this.leergrafico();
  }

  leertiempcompleto(){
    this.serviceService.gettiemposcompletos().subscribe((servicio: any) => {
      //console.log(servicio.turnos);
      this.servicio = servicio.turnos;

    });
  }

  leerpromatencion(){
    this.serviceService.getpromatencion().subscribe((serviciopa: any) => {
      console.log(serviciopa.turnos);
      this.serviciopa = serviciopa.turnos;

    });
  }
  leermaxatencion(){
    this.serviceService.getmaxatencion().subscribe((serviciomax: any) => {
      //console.log(serviciomax.turnos);
      this.serviciomax = serviciomax.turnos;

    });
  }
  leeratencionservicio(){
    this.serviceService.getatencionservicio().subscribe((servicioatser: any) => {
      //console.log(servicioatser.turnos);
      this.servicioatser = servicioatser.turnos;

    });
  }
  leergrafico(){
    this.serviceService.getatenciongrafico().subscribe((serviciograf: any) => {
     // console.log(serviciograf.turnos);
      this.serviciograf = serviciograf.turnos;

    });
  }

      //excel
      ExportTOExcel() {
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'excelprueba.xlsx');
      }
      generarPDF(){
        let data = document.getElementById('graficos');
        html2canvas(data).then(canvas =>{
          var imgData = canvas.toDataURL('image/png');
          var imgWidth = 210;
          var pageHeight = 295;
          var imgHeight = canvas.height * imgWidth / canvas.width;
          var heightLeft = imgHeight;
          var doc = new jsPDF('p', 'mm');
          var position = 10; // give some top padding to first page

          doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;

          while (heightLeft >= 0) {
            position += heightLeft - imgHeight; // top padding for other pages
            doc.addPage();
            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
          }
          doc.save( 'peterprueba.pdf');
        });




    }

      salir(){

      }

}
