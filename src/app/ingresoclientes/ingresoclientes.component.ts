import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { ServiceService } from '../services/service.service';
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
  selector: 'app-ingresoclientes',
  templateUrl: './ingresoclientes.component.html',
  styleUrls: ['./ingresoclientes.component.scss']
})
export class IngresoclientesComponent implements OnInit {
  @ViewChild('content') content:ElementRef;
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;


  servicio: any;


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
    this.leeringresoclientes();

    Utils.getImageDataUrlFromLocalPath1('assets/logotickets.png').then(
      result => this.urlImagen = result
    )


  }


  salir(){

    this.auth.logout();
    this.router.navigateByUrl('/');

  }

  leeringresoclientes(){
    this.serviceService.getingresoclientes().subscribe((servicio: any) => {
      console.log(servicio.turnos);
      this.servicio = servicio.turnos;

    });
  }

      //excel
      ExportTOExcel() {
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb,  'ingresoclientes' + '_export_' + new  Date().toLocaleString() + EXCEL_EXTENSION);
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
          doc.save( 'ingresoclientes.pdf');
        });




    }



generarPdf(action = 'open', pdf: number) {

  let documentDefinition;

  if (pdf === 1) {
    documentDefinition = this.getDocumentingtesoclientes();
  }

  switch (action) {
    case 'open': pdfMake.createPdf(documentDefinition).open(); break;
    case 'print': pdfMake.createPdf(documentDefinition).print(); break;
    case 'download': pdfMake.createPdf(documentDefinition).download(); break;

    default: pdfMake.createPdf(documentDefinition).open(); break;
  }

}




getDocumentingtesoclientes(){
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
        text: 'Reporte - Ingreso de Clientes'
      },
      this.ingresoclientes(this.servicio)
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


ingresoclientes(servicio: any[]) {
  //console.log(servicio);
  return {
    style: 'tableMargin',
    table: {
      headerRows: 1,
      widths: ['*', '*'],

      body: [
        [
          { text: 'Fecha.', style: 'tableHeader' },
          { text: 'Total Clientes', style: 'tableHeader' },

        ],
        ...servicio.map(res => {
          return [
            { style: 'itemsTable', text: res.turn_fecha },
            { style: 'itemsTable', text: res.clientes }
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
