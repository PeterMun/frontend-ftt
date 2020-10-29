import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

import { turno } from '../models/turno';
import { servicio } from '../models/servicio';
import { usuario } from '../models/usuario';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';


///pdf
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Utils } from '../utils/util';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

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
  servicio1: any = [];
  servicio2: any;
  servicio3: any;
  filterPost = '';
  serviciosearch: any;
  t: any=[];

  day = new Date().getDate();
  month = new Date().getMonth() + 1;
  year = new Date().getFullYear();

  date = this.year+"-"+this.month+"-"+this.day;

  p_color: any;


      // items de paginacion de la tabla
      tamanio_pagina: number = 5;
      numero_pagina: number = 1;
      pageSizeOptions = [5, 10, 20, 50];


      urlImagen: string;






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
    //this.getfiltrofecha();
  this.getDocumentturnosfecha();
    Utils.getImageDataUrlFromLocalPath1('assets/logotickets.png').then(
      result => this.urlImagen = result
    )

  }

  salir(){

    this.auth.logout();
    this.router.navigateByUrl('/');

  }

  leerturnosfecha(){
    this.serviceService.getturnosfecha().subscribe((servicio1: any) => {
      //console.log(servicio1);
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
      console.log(servicio3.turnos);
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


  generarPdf(action = 'open', pdf: number) {

    let documentDefinition;

    if (pdf === 1) {
      documentDefinition = this.getDocumentturnosfecha();
    }

    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;

      default: pdfMake.createPdf(documentDefinition).open(); break;
    }

  }




  getDocumentturnosfecha(){
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
          text: 'Reporte - Turno por Fecha'
        },
        this.CampoDetalle(this.servicio1)
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


  CampoDetalle(servicio: any[]) {
    //console.log(servicio);
    return {
      style: 'tableMargin',
      table: {
        headerRows: 1,
        widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto'],

        body: [
          [
            { text: 'Usuario', style: 'tableHeader' },
            { text: 'Servicio', style: 'tableHeader' },
            { text: 'Fecha', style: 'tableHeader' },
            { text: 'Atendidos', style: 'tableHeader' },
            { text: 'No Atendidos', style: 'tableHeader' },
            { text: 'Total', style: 'tableHeader' },
          ],
          ...servicio.map(res => {
            return [
              { style: 'itemsTable', text: res.Usuario },
              { style: 'itemsTable', text: res.Servicio },
              { style: 'itemsTable', text: res.Fecha },
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



  generarPdf1(action = 'open', pdf: number) {

    let documentDefinition;

    if (pdf === 1) {
      documentDefinition = this.getDocumentpromatencion();
    }

    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;

      default: pdfMake.createPdf(documentDefinition).open(); break;
    }

  }





    getDocumentpromatencion(){
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
          text: 'Reporte - Tiempo Promedio Atención'
        },
        this.Campopromedioatencion(this.servicio)
      ],
      styles: {
        tableTotal: { fontSize: 30, bold: true, alignment: 'center', fillColor: this.p_color },
        tableHeader: { fontSize: 9, bold: true, alignment: 'center', fillColor: this.p_color },
        itemsTable: { fontSize: 8, margin: [0, 3, 0, 3],  },
        itemsTableInfo: { fontSize: 10, margin: [0, 5, 0, 5] },
        subtitulos: { fontSize: 16, alignment: 'center', margin: [0, 5, 0, 10] },
        tableMargin: { margin: [0, 20, 0, 0] },
        CabeceraTabla: { fontSize: 12, alignment: 'center', margin: [0, 8, 0, 8], fillColor: this.p_color},
        quote: { margin: [5, -2, 0, -2], italics: true },
        small: { fontSize: 8, color: 'blue', opacity: 0.5 }
      }


    }
  }


  Campopromedioatencion(servicio: any[]) {
    //console.log(servicio);
    return {
      style: 'tableMargin',
      table: {
        headerRows: 1,
        alignment: "center",
        widths: ['*', 'auto', 100, '*'],
        body: [
          [
            { text: 'Usuario', style: 'tableHeader' },
            { text: 'Servicio', style: 'tableHeader' },
            { text: 'Promedio', style: 'tableHeader' },
            { text: 'Turnos', style: 'tableHeader' },
          ],
          ...servicio.map(res => {
            return [
              { style: 'itemsTable', text: res.Nombre },
              { style: 'itemsTable', text: res.Servicio },
              { style: 'itemsTable', text: res.Promedio },
              { style: 'itemsTable', text: res.Turnos }
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



  //////////////por hacer
  generarPdf2(action = 'open', pdf: number) {

    let documentDefinition;

    if (pdf === 1) {
      documentDefinition = this.getDocumententradassalidas();
    }

    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;

      default: pdfMake.createPdf(documentDefinition).open(); break;
    }

  }

  getDocumententradassalidas(){
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
              text: 'Reporte - Entradas y Salidas al Sistema'
            },
            this.entradassalidassistema(this.servicio2)
          ],
          styles: {
            tableTotal: { fontSize: 30, bold: true, alignment: 'center', fillColor: this.p_color },
            tableHeader: { fontSize: 9, bold: true, alignment: 'center', fillColor: this.p_color },
            itemsTable: { fontSize: 8, margin: [0, 3, 0, 3],  },
            itemsTableInfo: { fontSize: 10, margin: [0, 5, 0, 5] },
            subtitulos: { fontSize: 16, alignment: 'center', margin: [0, 5, 0, 10] },
            tableMargin: { margin: [0, 20, 0, 0] },
            CabeceraTabla: { fontSize: 12, alignment: 'center', margin: [0, 8, 0, 8], fillColor: this.p_color},
            quote: { margin: [5, -2, 0, -2], italics: true },
            small: { fontSize: 8, color: 'blue', opacity: 0.5 }
          }


        }

  }


  entradassalidassistema(servicio: any[]) {
    //console.log(servicio);
    return {
      style: 'tableMargin',
      table: {
        headerRows: 1,
        alignment: "center",
        widths: ['*', 'auto', 100],
        body: [
          [
            { text: 'Usuario', style: 'tableHeader' },
            { text: 'Hora Registrada', style: 'tableHeader' },
            { text: 'Razon', style: 'tableHeader' },
          ],
          ...servicio.map(res => {
            return [
              { style: 'itemsTable', text: res.Usuario },
              { style: 'itemsTable', text: res.fecha },
              { style: 'itemsTable', text: res.Razon }
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
      documentDefinition = this.getDocumentatencionusuario();
    }

    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;

      default: pdfMake.createPdf(documentDefinition).open(); break;
    }

  }

  getDocumentatencionusuario(){

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
                  text: 'Reporte - Atención al Usuario'
                },
                this.atencionusuario(this.servicio3)
              ],
              styles: {
                tableTotal: { fontSize: 30, bold: true, alignment: 'center', fillColor: this.p_color },
                tableHeader: { fontSize: 9, bold: true, alignment: 'center', fillColor: this.p_color },
                itemsTable: { fontSize: 8, margin: [0, 3, 0, 3],  },
                itemsTableInfo: { fontSize: 10, margin: [0, 5, 0, 5] },
                subtitulos: { fontSize: 16, alignment: 'center', margin: [0, 5, 0, 10] },
                tableMargin: { margin: [0, 20, 0, 0] },
                CabeceraTabla: { fontSize: 12, alignment: 'center', margin: [0, 8, 0, 8], fillColor: this.p_color},
                quote: { margin: [5, -2, 0, -2], italics: true },
                small: { fontSize: 8, color: 'blue', opacity: 0.5 }
              }


            }


  }


  atencionusuario(servicio: any[]) {
    //console.log(servicio);
    return {
      style: 'tableMargin',
      table: {
        headerRows: 1,
        alignment: "center",
        widths: ['*', 'auto', 100],
        body: [
          [
            { text: 'Nombre', style: 'tableHeader' },
            { text: 'Servicio', style: 'tableHeader' },
            { text: 'Atendidos', style: 'tableHeader' },
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
















}
