import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
//import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { ServiceService } from '../../services/service.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Chart } from 'chart.js' ;

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {DatePickerDirective} from 'ng2-date-picker';
import { Router } from '@angular/router';
import { Utils } from '../../utils/util';

///pdf
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';


(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {



  chart: any;
  tipo: string;
  servicio1: any;
  servicio: any;
  servicio2: any;
  serviciosearch: any;
  serviciosearch1: any;
  serviciosearch2: any;
  serviciosearch3: any;
  ////////////
  servgraf1: any;
  servgraf2: any;
  servgraf3: any;
  servgraf4: any;
  grafeva: any;
  grafeva2: any;

  p_color: any;

  day = new Date().getDate();
  month = new Date().getMonth() + 1;
  year = new Date().getFullYear();

  date = this.year+"-"+this.month+"-"+this.day;

    // items de paginacion de la tabla
    tamanio_pagina: number = 5;
    numero_pagina: number = 1;
    pageSizeOptions = [5, 10, 20, 50];


    urlImagen: string;

    public canvas : any;
    public ctx;
    public chartColor;
    public chartEmail;
    public chartHours;






  @ViewChild('dateDirectivePicker')
  datePickerDirective: DatePickerDirective;



  constructor(private serviceService: ServiceService,
              private auth: AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {
    this.tipo = 'pie';


    // this.leergrafocupacion();
    //this.leergraficoturnos();


  ///////
  this.gettotaltickets();
  this.gettotalatendidos();
  this.getsinatender();
  this.getpromedioatencion();
  this.getgrafeva();
  /////
  this.graficopromedioatencion();
  this.leergraficosevabar();
  ///

  ///
  Utils.getImageDataUrlFromLocalPath1('assets/logotickets.png').then(
    result => this.urlImagen = result
  );

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////


  }

  salir(){

    this.auth.logout();
    this.router.navigateByUrl('/');

  }


       /////pdf

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
          doc.save( 'menu.pdf');
        });




    }

///////////////////////////////////////////////////
    gettotaltickets(){

      this.serviceService.gettotaltickets(this.date).subscribe((servgraf1: any) => {
        //console.log(servgraf1.turnos);
        console.log(this.date);
        this.servgraf1 = servgraf1.turnos;

      });

    }

    gettotalatendidos(){
      this.serviceService.gettotalatendidos().subscribe((servgraf2: any) => {
        //console.log(servgraf2.turnos);
        this.servgraf2 = servgraf2.turnos;

      });

    }


    getsinatender(){
      this.serviceService.gettotalsinatender().subscribe((servgraf3: any) => {
        //console.log(servgraf3.turnos);
        this.servgraf3 = servgraf3.turnos;

      });

    }


    getpromedioatencion(){
      this.serviceService.getpromedioatencion().subscribe((servgraf4: any) => {
        //console.log(servgraf4.turnos);
        this.servgraf4 = servgraf4.turnos;

      });

    }


    getgrafeva(){
      this.serviceService.getgrafeva().subscribe((grafeva: any) => {
        //console.log(grafeva.turnos);
        this.grafeva = grafeva.turnos;
      });

    }



    graficopromedioatencion(){

      let myChart = new Chart('canvas1', {
        type: 'bar',
        data: {
            labels: ['MEDICINA FAMILIAR', 'OCUPACIONAL', 'QWEQERAXCXZ', 'PETER'],
            datasets: [{
                label: 'Servicios',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 23, 72, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',

                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    }


  leergraficosevabar(){
    this.serviceService.getgraficobarras().subscribe((grafeva2: any) => {
      //console.log(servicio5.turnos);
      this.grafeva2 = grafeva2.turnos;

      let total =  grafeva2.turnos.map(res => res.total);
      let evaluaciones = grafeva2.turnos.map(res => res.evaluacion);

/*       console.log(total);
      console.log(evaluaciones); */
      this.chart = new Chart('canvas2', {

        type: 'doughnut',
        data: {
          labels: evaluaciones,//eje x
          datasets: [{
              label: 'Total',
              data: total,//eje y
              backgroundColor: [
                'rgba(255, 99, 132, 5)',
                'rgba(54, 162, 235, 5)',
                'rgba(255, 206, 86, 5)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ]
          }]
      },

      });

    });
  }

  /////////////////PDFMAKE

  openPdf(){
    const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
    pdfMake.createPdf(documentDefinition).open();
  }

  ////////////////////////////////////////////////////////////////


























}
