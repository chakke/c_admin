import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';

@IonicPage()
@Component({
  selector: 'page-ba-dashboard',
  templateUrl: 'ba-dashboard.html',
})
export class BaDashboardPage {
  sumaryItems = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.sumaryItems = [
      {
        icon: "user",
        number: 150,
        text: "Khách hàng mới"
      },
      {
        icon: "bell",
        number: 350,
        text: "Đơn đặt hàng"
      },
      {
        icon: "gift",
        number: 200,
        text: "Lượt khyến mãi"
      },
      {
        icon: "money",
        number: 150000000,
        text: "Tổng doanh thu"
      }
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BaDashboardPage');
    this.drawChart();
  }

  drawChart() {
    let label = "Doanh số";
    var ctx = (<HTMLCanvasElement>document.getElementById("myChart"));
    ctx.height = 200;
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["T1", "T2", "T3", "T4", "T5", "T6"],
        datasets: [{
          label: label,
          data: [12, 190, 33, 56, 21, 300],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Doanh thu 6 tháng đầu năm',
          position: "bottom"
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            scaleLabel: {
              labelString: "Doanh số (triệu đồng)",
              display: true
            }

          }]
        },
        tooltips: {
          callbacks: {
            label: (item) => { return label + ": " + item.yLabel + " triệu" }
          }
        },
        scaleLabel: {
          labelString: "FUcker"
        }
      }
    });
  }

}
