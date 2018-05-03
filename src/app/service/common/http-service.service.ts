import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,} from '@angular/common/http';
import {CommonUtil} from '../../utils/commonUtil';
declare var $: any;
declare var layer: any;

@Injectable()
export class HttpServiceService {

  constructor(
    private http: HttpClient,
    private commonUtil: CommonUtil
  ) { }

  HttpPost(url: string ,requestData: any,header?: HttpHeaders) {
    if(this.commonUtil.isNull(header)){
      header = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    }
    return this.http.post(url,this.toBodyString(requestData),{headers:header})
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
    if (result && (result.status !== CommonUtil.RESPONSE_CODE.SUCCESS)) { // 由这里统一处理请求返回数据失败的情况
      layer.msg('玩命提示中');
    }
    if (result && (result.code === CommonUtil.RESPONSE_CODE.NEED_LOGIN)) {
      // this.events.publish('needLogin');
      layer.msg('需要登陆');
    }
    return result;
  }

  private handleError(error: Response | any) {
    let msg = '获取数据异常!';
    console.log(error);
    if (error.status === 0) {
      msg = '请求地址错误';
    }
    if (error.status === 400) {
      msg = '请求无效';
      console.log('请检查参数类型是否匹配');
    }
    if (error.status === 404) {
      msg = '请求资源不存在';
      console.error(msg+'，请检查路径是否正确');
    }
    layer.msg('发生错误'); // 由这里统一处理error,不需要每次都catch
    console.log(error,msg);
  }

  // http请求时对body数据的处理
  private  toBodyString(obj) {
    let ret = [];
    for (let key of obj) {
      key = encodeURIComponent($.trim(key));
      let values =obj[key];
      if (values && values.constructor === Array) {// 数组
        let queryValues = [];
        for (let i = 0, len = values.length, value; i < len; i++) {
          value = values[i];
          queryValues.push(this.toQueryPair(key, value));
        }
        ret = ret.concat(queryValues);
      } else if(typeof(values) === "object" &&
        Object.prototype.toString.call(values).toLowerCase() === "[object object]" ){ // json 对象
        ret.push(this.toQueryPair(key, JSON.stringify(values)));
      } else { // 字符串
        ret.push(this.toQueryPair(key, values));
      }
    }
    return ret.join('&');
  }

  private  toQueryPair(key, value) {
    if (typeof value === 'undefined') {
      return key;
    }
    return key + '=' + encodeURIComponent(value === null ? "":String(value));
  }
}

