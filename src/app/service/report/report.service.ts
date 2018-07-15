import { Injectable } from '@angular/core';
import {HttpService} from '../common/http-service';

@Injectable()
export class ReportService {

  constructor(
    private httpService : HttpService
  ) { }

  selectMonthOrders(month:number){
    return this.httpService.HttpGet("manage/report/monthOrders/"+month);
  }

}
