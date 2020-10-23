import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
//import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { ServiceService } from '../services/service.service';
import { Chart } from 'chart.js' ;
import { servicio } from '../models/servicio';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {DatePickerDirective} from 'ng2-date-picker';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';


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
      this.serviceService.gettotaltickets().subscribe((servgraf1: any) => {
        //console.log(servgraf1.turnos);
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
        console.log(grafeva.turnos);
        this.grafeva = grafeva.turnos;
      });

    }



    graficopromedioatencion(){

      this.serviceService.getturnos().subscribe((servicio: any) => {
/*           console.log(servicio.turnos);
        this.servicio = servicio.turnos; */

        let total =  servicio.turnos.map(res => res.Turnos);
        let promedios =  servicio.turnos.map(res => res.Promedio);
        let usuarios =  servicio.turnos.map(res => res.Nombre);


        this.chart = new Chart('canvas1', {

          type: this.tipo= 'line',
          data: {
            labels: promedios,//eje x
            datasets: [{
                label: 'Total atendidos',
                data: total,//eje y
                backgroundColor: [
                    'rgba(255, 99, 132, 5)',
                    'rgba(54, 162, 235, 5)',
                    'rgba(255, 206, 86, 5)',
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
























}
