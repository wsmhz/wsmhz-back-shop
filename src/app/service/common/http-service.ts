import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,} from '@angular/common/http';
import {CommonUtil} from '../../utils/commonUtil';
import {CommonConfig} from '../../config/commonConfig';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';
declare var $: any;


@Injectable()
export class HttpService {

  constructor(
    private http: HttpClient,
    private commonUtil: CommonUtil,
    private commonConfig:CommonConfig,
    private toastrService:ToastrService,
    private router: Router
  ) { }

  HttpPost(url: string ,requestData: any,header?: HttpHeaders) {
    if(this.commonUtil.isNull(header)){
      header = new HttpHeaders({'Content-Type': 'application/json'});
    }
    return this.http.post(url,$.param(requestData),{headers:header})
      .toPromise()
      .then(res => this.handleSuccess((res)))
      .catch(error => this.handleError(error));
  }

  HttpGet(url: string ,header?: HttpHeaders) {
    if(this.commonUtil.isNull(header)){
      header = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    }
    return this.http.get(url,{headers:header})
      .toPromise()
      .then(res => this.handleSuccess((res)))
      .catch(error => this.handleError(error));
  }

  private handleSuccess(result) {
    if (result && (result.status !== this.commonConfig.RESPONSE_CODE.SUCCESS)) { // 由这里统一处理请求返回数据失败的情况
      if( ! this.commonUtil.isNull(result.msg)){
        this.toastrService.error(result.msg,"",{positionClass: 'toast-bottom-right',timeOut:1000});
      }
    }else if( ! this.commonUtil.isNull(result.msg)){
      this.toastrService.info(result.msg,"",{positionClass: 'toast-bottom-right',timeOut:1000});
    }
    return result;
  }

  private handleError(errorResponse: Response | any) {
    let msg = errorResponse.error.msg;
    if (errorResponse.status === 0) {
      msg = '请求地址错误';
    }
    if (errorResponse.status === 400) {
      msg = '请求无效';
    }
    if (errorResponse.status === 404) {
      msg = '请求资源不存在';
    }
    if (errorResponse.status === 401 && errorResponse.error.status === this.commonConfig.RESPONSE_CODE.NEED_LOGIN) {
      this.router.navigate(["/login"]);
    }
    this.toastrService.error(msg,"",{positionClass: 'toast-bottom-right',timeOut:1000}); // 由这里统一处理error,不需要每次都catch
    console.log(errorResponse,msg);
  }

}

