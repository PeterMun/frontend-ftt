import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { turno } from '../models/turno';
import { Chart } from 'chart.js' ;
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

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

  constructor(private serviceService: ServiceService,
    private auth: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.tipo = 'pie';
    this.dibujar();
    this.leergrafocupacion();
    this.leerocupacion();
  }

  salir(){

    this.auth.logout();
    this.router.navigateByUrl('/');

  }



  dibujar(){
    //this.serviceService
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
      //this.servicio = servicio.turnos;
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









}
