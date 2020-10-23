import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

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


  constructor(private serviceService: ServiceService,
    private auth: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.leeringresoclientes();

  }


  salir(){

    this.auth.logout();
    this.router.navigateByUrl('/');

  }

  leeringresoclientes(){
    this.serviceService.getingresoclientes().subscribe((servicio: any) => {
      //console.log(servicio.turnos);
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




}
