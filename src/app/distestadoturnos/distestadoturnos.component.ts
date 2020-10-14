import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { ServiceService } from '../services/service.service';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-distestadoturnos',
  templateUrl: './distestadoturnos.component.html',
  styleUrls: ['./distestadoturnos.component.scss']
})
export class DistestadoturnosComponent implements OnInit {
  @ViewChild('content') content:ElementRef;
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  servicio: any;



  constructor(private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.leerdistribucionturnos();
  }

  leerdistribucionturnos(){
    this.serviceService.getdistribucionturnos().subscribe((servicio: any) => {
      //console.log(servicio.turnos);
      this.servicio = servicio.turnos;

    });
  }

      //excel
      ExportTOExcel() {
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb,  'prueba' + '_export_' + new  Date().toLocaleString() + EXCEL_EXTENSION);
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
