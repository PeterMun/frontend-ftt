import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js' ;
import { ServiceService } from '../services/service.service';
import { servicio } from '../models/servicio';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

///pdf
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Utils } from '../utils/util';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;


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
  @ViewChild('content2') content2:ElementRef;
  @ViewChild('TABLE2', { static: false }) TABLE2: ElementRef;
  @ViewChild('content3') content3:ElementRef;
  @ViewChild('TABLE3', { static: false }) TABLE3: ElementRef;
  @ViewChild('content4') content4:ElementRef;
  @ViewChild('TABLE4', { static: false }) TABLE4: ElementRef;

  servicio: any;
  serviciopa: any;
  serviciomax:any;
  servicioatser: any;
  serviciograf: any;

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
    private router: Router
    ) { }

  ngOnInit(): void {
    this.leertiempcompleto();
    this.leerpromatencion();
    this.leermaxatencion();
    this.leeratencionservicio();
    this.leergrafico();

    Utils.getImageDataUrlFromLocalPath1('assets/logotickets.png').then(
      result => this.urlImagen = result
    )

  }

  salir(){

    this.auth.logout();
    this.router.navigateByUrl('/');

  }

  leertiempcompleto(){
    this.serviceService.gettiemposcompletos().subscribe((servicio: any) => {
      //console.log(servicio.turnos);
      this.servicio = servicio.turnos;

    });
  }

  leerpromatencion(){
    this.serviceService.getpromatencion().subscribe((serviciopa: any) => {
      //console.log(serviciopa.turnos);
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
      console.log(serviciograf.turnos);
      this.serviciograf = serviciograf.turnos;

    });
  }



    //excel
    ExportTOExcel() {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb,  'at-tiempocompleto' + '_export_' + new  Date().toLocaleString() + EXCEL_EXTENSION);
    }
    ExportTOExcel1() {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE1.nativeElement);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb,  'promediosatencion' + '_export_' + new  Date().toLocaleString() + EXCEL_EXTENSION);
    }
    ExportTOExcel2() {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE2.nativeElement);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb,  'maximosatencion' + '_export_' + new  Date().toLocaleString() + EXCEL_EXTENSION);
    }
    ExportTOExcel3() {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE3.nativeElement);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb,  'atencionservicio' + '_export_' + new  Date().toLocaleString() + EXCEL_EXTENSION);
    }
    ExportTOExcel4() {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE4.nativeElement);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb,  'at-graficoservicio' + '_export_' + new  Date().toLocaleString() + EXCEL_EXTENSION);
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
        doc.save( 'at-tiempocompleto.pdf');
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
      doc.save( 'promediosatencion.pdf');
    });
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
    var position = 10; // give some top padding to first page

    doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position += heightLeft - imgHeight; // top padding for other pages
      doc.addPage();
      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    doc.save( 'maximosatencion.pdf');
  });
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
    var position = 10; // give some top padding to first page

    doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position += heightLeft - imgHeight; // top padding for other pages
      doc.addPage();
      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    doc.save( 'atencionservicio.pdf');
  });
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
    var position = 10; // give some top padding to first page

    doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position += heightLeft - imgHeight; // top padding for other pages
      doc.addPage();
      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    doc.save( 'at-graficoservicio.pdf');
  });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

generarPdf(action = 'open', pdf: number) {

  let documentDefinition;

  if (pdf === 1) {
    documentDefinition = this.getDocumenttiempocompleto();
  }

  switch (action) {
    case 'open': pdfMake.createPdf(documentDefinition).open(); break;
    case 'print': pdfMake.createPdf(documentDefinition).print(); break;
    case 'download': pdfMake.createPdf(documentDefinition).download(); break;

    default: pdfMake.createPdf(documentDefinition).open(); break;
  }

}




getDocumenttiempocompleto(){
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
        text: 'Reporte - Atención Tiempo Completo'
      },
      this.tiempocompleto(this.servicio)
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


tiempocompleto(servicio: any[]) {
  //console.log(servicio);
  return {
    style: 'tableMargin',
    table: {
      headerRows: 1,
      widths: ['*', 'auto', 'auto', 'auto', 'auto'],

      body: [
        [
          { text: 'Usuario', style: 'tableHeader' },
          { text: 'Servicio', style: 'tableHeader' },
          { text: 'Fecha', style: 'tableHeader' },
          { text: 'Tiempo Espera', style: 'tableHeader' },
          { text: 'Tiempo Atención', style: 'tableHeader' },

        ],
        ...servicio.map(res => {
          return [
            { style: 'itemsTable', text: res.Usuario },
            { style: 'itemsTable', text: res.Servicio },
            { style: 'itemsTable', text: res.Fecha },
            { style: 'itemsTable', text: res.Tiempo_Espera },
            { style: 'itemsTable', text: res.Tiempo_Atencion }
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



generarPdf1(action = 'open', pdf: number) {

  let documentDefinition;

  if (pdf === 1) {
    documentDefinition = this.getDocumentpromedioatencion();
  }

  switch (action) {
    case 'open': pdfMake.createPdf(documentDefinition).open(); break;
    case 'print': pdfMake.createPdf(documentDefinition).print(); break;
    case 'download': pdfMake.createPdf(documentDefinition).download(); break;

    default: pdfMake.createPdf(documentDefinition).open(); break;
  }

}




getDocumentpromedioatencion(){
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
        text: 'Reporte - Promedio de Atención'
      },
      this.promediosatencion(this.serviciopa)
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


promediosatencion(servicio: any[]) {
  //console.log(servicio);
  return {
    style: 'tableMargin',
    table: {
      headerRows: 1,
      widths: ['*', 'auto', 'auto', 'auto'],

      body: [
        [
          { text: 'Cod.', style: 'tableHeader' },
          { text: 'Servicio', style: 'tableHeader' },
          { text: 'T. Promedio de Espera', style: 'tableHeader' },
          { text: 'T. Promedio de Atención', style: 'tableHeader' },


        ],
        ...servicio.map(res => {
          return [
            { style: 'itemsTable', text: res.SERV_CODIGO },
            { style: 'itemsTable', text: res.SERV_NOMBRE },
            { style: 'itemsTable', text: res.PromedioEspera },
            { style: 'itemsTable', text: res.PromedioAtencion }
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



generarPdf2(action = 'open', pdf: number) {

  let documentDefinition;

  if (pdf === 1) {
    documentDefinition = this.getDocumentmaxatencion();
  }

  switch (action) {
    case 'open': pdfMake.createPdf(documentDefinition).open(); break;
    case 'print': pdfMake.createPdf(documentDefinition).print(); break;
    case 'download': pdfMake.createPdf(documentDefinition).download(); break;

    default: pdfMake.createPdf(documentDefinition).open(); break;
  }

}




getDocumentmaxatencion(){
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
        text: 'Reporte - Maximos de Atención'
      },
      this.maxatencion(this.serviciomax)
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


maxatencion(servicio: any[]) {
  //console.log(servicio);
  return {
    style: 'tableMargin',
    table: {
      headerRows: 1,
      widths: ['auto', '*', 'auto', 'auto'],

      body: [
        [
          { text: 'Cod.', style: 'tableHeader' },
          { text: 'Servicio', style: 'tableHeader' },
          { text: 'T. Promedio de Espera', style: 'tableHeader' },
          { text: 'T. Promedio de Atención', style: 'tableHeader' },


        ],
        ...servicio.map(res => {
          return [
            { style: 'itemsTable', text: res.SERV_CODIGO },
            { style: 'itemsTable', text: res.SERV_NOMBRE },
            { style: 'itemsTable', text: res.Fecha },
            { style: 'itemsTable', text: res.Maximo }
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


generarPdf3(action = 'open', pdf: number) {

  let documentDefinition;

  if (pdf === 1) {
    documentDefinition = this.getDocumentatencionservicio();
  }

  switch (action) {
    case 'open': pdfMake.createPdf(documentDefinition).open(); break;
    case 'print': pdfMake.createPdf(documentDefinition).print(); break;
    case 'download': pdfMake.createPdf(documentDefinition).download(); break;

    default: pdfMake.createPdf(documentDefinition).open(); break;
  }

}




getDocumentatencionservicio(){
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
        text: 'Reporte - Atencion servicio'
      },
      this.atencionservicio(this.servicioatser)
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


atencionservicio(servicio: any[]) {
  //console.log(servicio);
  return {
    style: 'tableMargin',
    table: {
      headerRows: 1,
      widths: ['*', '*', 'auto'],

      body: [
        [
          { text: 'Nombre.', style: 'tableHeader' },
          { text: 'Servicio', style: 'tableHeader' },
          { text: 'Atendidos', style: 'tableHeader' }


        ],
        ...servicio.map(res => {
          return [
            { style: 'itemsTable', text: res.Nombre },
            { style: 'itemsTable', text: res.Servicio },
            { style: 'itemsTable', text: res.Atendidos }
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



generarPdf4(action = 'open', pdf: number) {

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
        text: 'Reporte - Grafico Atencion Servicios'
      },
      this.atenciongrafservicio(this.serviciograf)
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


atenciongrafservicio(servicio: any[]) {
  //console.log(servicio);
  return {
    style: 'tableMargin',
    table: {
      headerRows: 1,
      widths: ['*', 'auto', 'auto','auto'],

      body: [
        [
          { text: 'Servicio.', style: 'tableHeader' },
          { text: 'Atendidos', style: 'tableHeader' },
          { text: 'No Atendidos', style: 'tableHeader' },
          { text: 'Total', style: 'tableHeader' }


        ],
        ...servicio.map(res => {
          return [
            { style: 'itemsTable', text: res.Servicio },
            { style: 'itemsTable', text: res.Atendidos },
            { style: 'itemsTable', text: res.No_Atendidos },
            { style: 'itemsTable', text: res.Total }
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
