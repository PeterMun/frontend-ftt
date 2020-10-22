import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { evaluacion } from '../models/evaluacion';

import { Chart } from 'chart.js' ;

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

const PDF_EXTENSION = '.pdf';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.scss']
})
export class EvaluacionComponent implements OnInit {
  @ViewChild('content') content:ElementRef;
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  @ViewChild('content1') content1:ElementRef;
  @ViewChild('TABLE1', { static: false }) TABLE1: ElementRef;
  @ViewChild('content2') content2:ElementRef;
  @ViewChild('TABLE2', { static: false }) TABLE2: ElementRef;
  @ViewChild('content3') content3:ElementRef;
  @ViewChild('TABLE3', { static: false }) TABLE3: ElementRef;

  //turno:turno[];

  servicio: any;
  servicio1: any;
  servicio2: any;
  servicio3: any;
  servicio4: any;
  servicio5: any;
  servicioe:any;
  chart: any;
  tipo: string;
  tipo2: string;

  constructor(private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.leerpromservicio();
    this.leermaxminservicio();
    //
    //
    this.leerestablecimientos();
    this.leerevagrupo();
    this.tipo = 'bar';
    this.leergraficosevabar();
    //this.leergraficosevapie();
  }


  leerpromservicio(){
    this.serviceService.getprmediosservicios().subscribe((servicio: any) => {
      //console.log(servicio.turnos);
      this.servicio = servicio.turnos;

    });
  }

  leermaxminservicio(){
    this.serviceService.getmaxminservicios().subscribe((servicio1: any) => {
      //console.log(servicio1.turnos);
      this.servicio1 = servicio1.turnos;

    });
  }

  leerempleado(){
    this.serviceService.getprmediosempleado().subscribe((servicio2: any) => {
      //console.log(servicio1.turnos);
      this.servicio2 = servicio2.turnos;
    });
  }
  leermaxminempleado(){
    this.serviceService.getmaxminempleado().subscribe((servicio3: any) => {
      //console.log(servicio3.turnos);
      this.servicio3 = servicio3.turnos;
    });
  }

  leerestablecimientos(){
    this.serviceService.getestablecimiento().subscribe((servicio4: any) => {
      //console.log(servicio4.turnos);
      this.servicio4 = servicio4.turnos;

    });
  }

  leerevagrupo(){
    this.serviceService.getevalgrupo().subscribe((servicioe: any) => {
      //console.log(servicioe.turnos);
      this.servicioe = servicioe.turnos;

    });
  }

  leergraficosevabar(){
    this.serviceService.getgraficobarras().subscribe((servicio5: any) => {
      //console.log(servicio5.turnos);
      this.servicio5 = servicio5.turnos;

      let total =  servicio5.turnos.map(res => res.cuenta);
      let evaluaciones = servicio5.turnos.map(res => res.Evaluacion);

/*       console.log(total);
      console.log(evaluaciones); */
      this.chart = new Chart('canvas', {

        type: this.tipo,
        data: {
          labels: evaluaciones,//eje x
          datasets: [{
              label: 'Total',
              data: total,//eje y
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ]
          }]
      },

      });

    });
  }



  cambiar(tipo: string){
    this.tipo = tipo;
    if(this.chart){
      this.chart.destroy();

    }
    this.leergraficosevabar();
  }


    //excel
    ExportTOExcel() {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb,  'entradassalidas' + '_export_' + new  Date().toLocaleString() + EXCEL_EXTENSION);
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
