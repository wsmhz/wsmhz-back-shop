import { Component, OnInit } from '@angular/core';
import {ReportService} from '../../service/report/report.service';
import {CommonConfig} from '../../config/commonConfig';

declare var echarts:any;
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers:[
    ReportService
  ]
})
export class ReportComponent implements OnInit {

  constructor(
    private reportService:ReportService,
    private commonConfig:CommonConfig
  ) { }

  ngOnInit() {
    this.selectMonthOrders();
  }

  selectMonthOrders(){
    this.reportService.selectMonthOrders(1)
      .then(res => {
        if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
          console.log(res.data);
          this.initMonthOrders(res.data,1);
        }
      });
  }

  initMonthOrders(data:any,month:number){
    let dom = document.getElementById("container");
    let myChart = echarts.init(dom);
    let app = {};
    let option = null;
    option = {
      backgroundColor: '#fff',

      title: {
        text: month+"月内的订单交易情况",
        left: 'center',
        top: 20,
        textStyle: {
          color: '#000'
        }
      },

      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },

      visualMap: {
        show: false,
        min: 150,
        max: 600,
        inRange: {
          colorLightness: [0, 1]
        }
      },
      series : [
        {
          name:'订单量',
          type:'pie',
          radius : '55%',
          center: ['50%', '50%'],
          data:data.sort(function (a, b) { return a.value - b.value; }),
          roseType: 'radius',
          label: {
            normal: {
              textStyle: {
                color: '#000'
              }
            }
          },
          labelLine: {
            normal: {
              lineStyle: {
                color: '#000'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            }
          },
          itemStyle: {
            normal: {
              color: '#c23531',
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },

          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function (idx) {
            return Math.random() * 200;
          }
        }
      ]
    };
    if (option && typeof option === "object") {
      myChart.setOption(option, true);
    }
  }


}
