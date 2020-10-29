import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { turno } from '../models/turno';
import { Chart } from 'chart.js' ;
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

///pdf
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Utils } from '../utils/util';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;


import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-ocupacion',
  templateUrl: './ocupacion.component.html',
  styleUrls: ['./ocupacion.component.scss']
})
export class OcupacionComponent implements OnInit {
  @ViewChild('content') content:ElementRef;
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  @ViewChild('content1') content1:ElementRef;
  @ViewChild('TABLE1', { static: false }) TABLE1: ElementRef;

  chart: any;
  tipo: string;
  servicio: any;
  serviciooc: any;


  p_color: any;


  // items de paginacion de la tabla
  tamanio_pagina: number = 5;
  numero_pagina: number = 1;
  pageSizeOptions = [5, 10, 20, 50];

  day = new Date().getDate();
  month = new Date().getMonth() + 1;
  year = new Date().getFullYear();

  date = this.year+"-"+this.month+"-"+this.day;


  urlImagen: string;


  constructor(private serviceService: ServiceService,
    private auth: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.tipo = 'pie';
    this.leergrafocupacion();
    this.leerocupacion();

    Utils.getImageDataUrlFromLocalPath1('assets/logotickets.png').then(
      result => this.urlImagen = result
    )
  }

  salir(){

    this.auth.logout();
    this.router.navigateByUrl('/');

  }



  leerocupacion(){
    this.serviceService.getocupacionservicios().subscribe((serviciooc: any) => {
      //console.log(serviciooc.turnos);
      this.serviciooc = serviciooc.turnos;

    });
  }

  leergrafocupacion(){
    this.serviceService.getgraficoocupacion().subscribe((servicio: any) => {
     //console.log(servicio.turnos);
      this.servicio = servicio.turnos;
      let total =  servicio.turnos.map(res => res.total);
      let servicios = servicio.turnos.map(res => res.SERV_NOMBRE);
      let codigo = servicio.turnos.map(res => res.SERV_CODIGO);
      //let procentaje;
      //let codigo;
      //console.log(total);
      //console.log(servicios);
      //console.log(codigo);

      this.chart = new Chart('canvas', {

        type: this.tipo,
        data: {
          labels: servicios,//eje x
          datasets: [{
              label: 'Total',
              data: total,//eje y
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  ///////////////////////////
                  'rgba(104, 210, 34, 0.2)',
                  'rgba(34, 113, 210, 0.2)',
                  'rgba(157, 34, 210, 0.2)',
                  'rgba(210, 34, 75, 0.2)',
                  'rgba(34, 207, 210, 0.2)',
                  'rgba(34, 207, 154, 0.2)',
                  'rgba(210, 63, 34, 0.2)',
                  'rgba(155, 176, 17, 0.2)',
                  'rgba(32, 37, 3, 0.2)',
                  'rgba(5, 81, 53, 0.2)',
                  'rgba(66, 96, 85, 0.2)',
                  'rgba(17, 163, 212, 0.2)'
              ]
          }]
      },

      });

      this.chart = new Chart('canvas2', {

        type: this.tipo= 'bar',
        data: {
          labels: servicios,//eje x
          datasets: [{
              label: 'Total',
              data: total,//eje y
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  ///////////////////////////
                  'rgba(104, 210, 34, 0.2)',
                  'rgba(34, 113, 210, 0.2)',
                  'rgba(157, 34, 210, 0.2)',
                  'rgba(210, 34, 75, 0.2)',
                  'rgba(34, 207, 210, 0.2)',
                  'rgba(34, 207, 154, 0.2)',
                  'rgba(210, 63, 34, 0.2)',
                  'rgba(155, 176, 17, 0.2)',
                  'rgba(32, 37, 3, 0.2)',
                  'rgba(5, 81, 53, 0.2)',
                  'rgba(66, 96, 85, 0.2)',
                  'rgba(17, 163, 212, 0.2)'
              ]
          }]
      },

      });

    });
  }

        //excel
        ExportTOExcel() {
          const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
          const wb: XLSX.WorkBook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
          XLSX.writeFile(wb,  'ocupacionservicios' + '_export_' + new  Date().toLocaleString() + EXCEL_EXTENSION);
        }
        ExportTOExcel1() {
          const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.content1.nativeElement);
          const wb: XLSX.WorkBook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
          XLSX.writeFile(wb,  'graficoocupacion' + '_export_' + new  Date().toLocaleString() + EXCEL_EXTENSION);
        }



    generarPDF(){
      let data = document.getElementById('content');
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
        doc.save( 'ocupacionservicios.pdf');
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
      var position = 10; // give some top padding to first page

      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position += heightLeft - imgHeight; // top padding for other pages
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save( 'ocupaciongraf.pdf');
    });
}


generarPdf(action = 'open', pdf: number) {

  let documentDefinition;

  if (pdf === 1) {
    documentDefinition = this.getDocumentatencionserviciograf();
  }

  switch (action) {
    case 'open': pdfMake.createPdf(documentDefinition).open(); break;
    case 'print': pdfMake.createPdf(documentDefinition).print(); break;
    case 'download': pdfMake.createPdf(documentDefinition).download(); break;

    default: pdfMake.createPdf(documentDefinition).open(); break;
  }

}




getDocumentatencionserviciograf(){
  //sessionStorage.setItem('Usuario', 'Postmaster');
  let f = new Date();
  f.setUTCHours(f.getHours())
  this.date = f.toJSON();
  console.log(this.date);

  return {
    //pageOrientation: 'landscape',
    watermark: { text: 'Tickets', color: 'blue', opacity: 0.1, bold: true, italics: false },
    header: { text: 'Impreso por:  ' + 'Postmaster', margin: 10, fontSize: 9, opacity: 0.3 },

    footer: function (currentPage, pageCount, fecha) {
      fecha = f.toJSON().split("T")[0];
      var timer = f.toJSON().split("T")[1].slice(0, 5);
      return [
        {
          margin: [10, -2, 10, 0],
          columns: [
            'Fecha: ' + fecha + ' Hora: ' + timer,
            {
              text: [
                {
                  text: '© Pag ' + currentPage.toString() + ' of ' + pageCount, alignment: 'right', color: 'blue', opacity: 0.5
                }
              ],
            }
          ],
          fontSize: 9, color: '#A4B8FF',
        }
      ]
    },

    content: [
      {
        columns: [
          {
            image: this.urlImagen,
            width: 90,
            height: 40,
          },
          {
            width: '*',
            text: 'Casa Pazmiño',
            bold: true,
            fontSize: 20,
            margin: [100, 20, 0, 0],
          }
        ]
      },
      {
        style: 'subtitulos',
        text: 'Reporte - Ocupación'
      },
      this.ocupacion(this.servicio)
    ],
    styles: {
      tableTotal: { fontSize: 30, bold: true, alignment: 'center', fillColor: this.p_color },
      tableHeader: { fontSize: 9, bold: true, alignment: 'center', fillColor: this.p_color },
      itemsTable: { fontSize: 8, margin: [0, 3, 0, 3],  },
      itemsTableInfo: { fontSize: 10, margin: [0, 5, 0, 5] },
      subtitulos: { fontSize: 16, alignment: 'center', margin: [0, 5, 0, 10] },
      tableMargin: { margin: [0, 20, 0, 0], alignment: "center" },
      CabeceraTabla: { fontSize: 12, alignment: 'center', margin: [0, 8, 0, 8], fillColor: this.p_color},
      quote: { margin: [5, -2, 0, -2], italics: true },
      small: { fontSize: 8, color: 'blue', opacity: 0.5 }
    }


  }
}


ocupacion(servicio: any[]) {
  //console.log(servicio);
  return {
    style: 'tableMargin',
    table: {
      headerRows: 1,
      widths: ['auto', '*', 'auto','auto'],

      body: [
        [
          { text: 'Cod.', style: 'tableHeader' },
          { text: 'Servicio', style: 'tableHeader' },
          { text: 'T. Turno', style: 'tableHeader' },
          { text: 'Porcentaje Ocupacion', style: 'tableHeader' }
        ],
        ...servicio.map(res => {
          return [
            { style: 'itemsTable', text: res.SERV_CODIGO },
            { style: 'itemsTable', text: res.SERV_NOMBRE },
            { style: 'itemsTable', text: res.total },
            { style: 'itemsTable', text: res.PORCENTAJE }
          ]
        })
      ]
    },
    layout: {
      fillColor: function (rowIndex) {
        return (rowIndex % 2 === 0) ? '#E5E7E9' : null;
      }
    }
  }

}











}
