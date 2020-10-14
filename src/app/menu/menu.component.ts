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


  @ViewChild('dateDirectivePicker')
  datePickerDirective: DatePickerDirective;

  constructor(private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.tipo = 'pie';

    // this.leergrafocupacion();
    //this.leergraficoturnos();
  this.graficopromedioatencion();
  this.graficoingresoclientes();

  this.getfiltrofecha();
  this.getatencionusuario();
  this.getpromediosatencion();


  }

  salir(){

  }






    graficopromedioatencion(){

        this.serviceService.getturnos().subscribe((servicio: any) => {
/*           console.log(servicio.turnos);
          this.servicio = servicio.turnos; */

          let total =  servicio.turnos.map(res => res.Turnos);
          let promedios =  servicio.turnos.map(res => res.Promedio);
          let usuarios =  servicio.turnos.map(res => res.Nombre);


          this.chart = new Chart('canvas3', {

            type: this.tipo= 'bar',
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

    graficoingresoclientes(){
      this.serviceService.getingresoclientes().subscribe((servicio2: any) => {
/*         console.log(servicio2.turnos);
        this.servicio2 = servicio2.turnos;
 */
        let clientes =  servicio2.turnos.map(res => res.clientes);
        let fechas =  servicio2.turnos.map(res => res.turn_fecha);

        this.chart = new Chart('canvas4', {

          type: this.tipo= 'line',
          data: {
            labels: fechas,//eje x
            datasets: [{
                label: 'Clientes',
                data: clientes,//eje y
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
          doc.save( 'peterprueba.pdf');
        });




    }

    getfiltrofecha(){
      //getfiltroturnosfecha()



      let fecha = (<HTMLInputElement>document.getElementById('start')).value;
      console.log('esto es la fecha: ', fecha);

      this.serviceService.getfiltroturnosfecha(fecha).subscribe((serviciosearch: any) => {
        //console.log(serviciosearch.turnos);
        //this.serviciosearch = serviciosearch.turnos;


        let total =  serviciosearch.turnos.map(res => res.Total);
        let servicios =  serviciosearch.turnos.map(res => res.Servicio);
        let atendidos =  serviciosearch.turnos.map(res => res.Atendidos);
        let noatendidos =  serviciosearch.turnos.map(res => res.No_Atendidos);
     /*      console.log(total);
      console.log(servicios);
        console.log(atendidos);
        console.log(noatendidos);*/

        this.chart = new Chart('canvas', {

          type: 'bar',
          data: {
            labels: servicios,//eje x
            datasets: [{
                label: 'Total',
                data: total, //eje y
                backgroundColor: [
                    'rgba(255, 99, 132, 5)',
                    'rgba(54, 162, 235, 5)',
                    'rgba(255, 206, 86, 5)',
                    'rgba(75, 192, 192, 5)',
                    'rgba(153, 102, 255, 5)',
                    'rgba(255, 159, 64, 5)',
                    ///////////////////////////
                    'rgba(104, 210, 34, 5)',
                    'rgba(34, 113, 210, 5)',
                    'rgba(157, 34, 210, 5)',
                    'rgba(210, 34, 75, 5)',
                    'rgba(34, 207, 210, 5)',
                    'rgba(34, 207, 154, 5)',
                    'rgba(210, 63, 34, 5)',
                    'rgba(155, 176, 17, 5)',
                    'rgba(32, 37, 3, 5)',
                    'rgba(5, 81, 53, 5)',
                    'rgba(66, 96, 85, 5)',
                    'rgba(17, 163, 212, 5)',
                    'rgba(34, 207, 210, 5)',
                    'rgba(34, 207, 154, 5)',
                    'rgba(210, 63, 34, 5)',
                    'rgba(155, 176, 17, 5)',
                    'rgba(32, 37, 3, 5)',
                    'rgba(5, 81, 53, 5)',
                    'rgba(66, 96, 85, 5)',
                    'rgba(17, 163, 212, 5)',
                    'rgba(32, 37, 3, 5)',
                    'rgba(5, 81, 53, 5)',
                    'rgba(66, 96, 85, 5)',
                    'rgba(17, 163, 212, 5)',
                    'rgba(34, 207, 210, 5)',
                    'rgba(34, 207, 154, 5)',
                    'rgba(210, 63, 34, 5)',
                    'rgba(155, 176, 17, 5)',
                    'rgba(32, 37, 3, 5)',
                    'rgba(5, 81, 53, 5)',
                    'rgba(66, 96, 85, 5)',
                    'rgba(17, 163, 212, 5)',
                    'rgba(255, 99, 132, 5)',
                    'rgba(54, 162, 235, 5)',
                    'rgba(255, 206, 86, 5)',
                    'rgba(75, 192, 192, 5)',
                    'rgba(153, 102, 255, 5)',
                    'rgba(255, 159, 64, 5)'
                ]
            }]
        },

        });

      });




    }

    getatencionusuario(){
      let fecha = (<HTMLInputElement>document.getElementById('start1')).value;
      console.log('esto es la fecha graf1: ', fecha);

      this.serviceService.getatencionusuariomenu(fecha).subscribe((serviciosearch1: any) => {
        console.log(serviciosearch1.turnos);
        this.serviciosearch1 = serviciosearch1.turnos;

        let total =  serviciosearch1.turnos.map(res => res.total);
        let servicios =  serviciosearch1.turnos.map(res => res.SERV_NOMBRE);
        let porcentaje =  serviciosearch1.turnos.map(res => res.PORCENTAJE);

        this.chart = new Chart('canvas2', {

          type: 'bar',
          data: {
            labels: servicios,//eje x
            datasets: [{
                label: 'Total',
                data: porcentaje, //eje y
                backgroundColor: [
                    'rgba(255, 99, 132, 5)',
                    'rgba(54, 162, 235, 5)',
                    'rgba(255, 206, 86, 5)',
                    'rgba(75, 192, 192, 5)',
                    'rgba(153, 102, 255, 5)',
                    'rgba(255, 159, 64, 5)',
                    ///////////////////////////
                    'rgba(104, 210, 34, 5)',
                    'rgba(34, 113, 210, 5)',
                    'rgba(157, 34, 210, 5)',
                    'rgba(210, 34, 75, 5)',
                    'rgba(34, 207, 210, 5)',
                    'rgba(34, 207, 154, 5)',
                    'rgba(210, 63, 34, 5)',
                    'rgba(155, 176, 17, 5)',
                    'rgba(32, 37, 3, 5)',
                    'rgba(5, 81, 53, 5)',
                    'rgba(66, 96, 85, 5)',
                    'rgba(17, 163, 212, 5)',
                    'rgba(34, 207, 210, 5)',
                    'rgba(34, 207, 154, 5)',
                    'rgba(210, 63, 34, 5)',
                    'rgba(155, 176, 17, 5)',
                    'rgba(32, 37, 3, 5)',
                    'rgba(5, 81, 53, 5)',
                    'rgba(66, 96, 85, 5)',
                    'rgba(17, 163, 212, 5)',
                    'rgba(32, 37, 3, 5)',
                    'rgba(5, 81, 53, 5)',
                    'rgba(66, 96, 85, 5)',
                    'rgba(17, 163, 212, 5)',
                    'rgba(34, 207, 210, 5)',
                    'rgba(34, 207, 154, 5)',
                    'rgba(210, 63, 34, 5)',
                    'rgba(155, 176, 17, 5)',
                    'rgba(32, 37, 3, 5)',
                    'rgba(5, 81, 53, 5)',
                    'rgba(66, 96, 85, 5)',
                    'rgba(17, 163, 212, 5)',
                    'rgba(255, 99, 132, 5)',
                    'rgba(54, 162, 235, 5)',
                    'rgba(255, 206, 86, 5)',
                    'rgba(75, 192, 192, 5)',
                    'rgba(153, 102, 255, 5)',
                    'rgba(255, 159, 64, 5)'
                ]
            }]
        },

        });





       });


    }


    getpromediosatencion(){
      let fecha = (<HTMLInputElement>document.getElementById('start2')).value;
      console.log('esto es la fecha graf2: ', fecha);

      this.serviceService.getpromediosatencionmenu(fecha).subscribe((serviciosearch2: any) => {
        console.log(this.serviciosearch2.turnos);
        this.serviciosearch2 = serviciosearch2.turnos;
      } )

    }

    getingresoclientes(){
      let fecha = (<HTMLInputElement>document.getElementById('start3')).value;
      console.log('esto es la fecha graf3: ', fecha);

    }












}
