import { Injectable} from "@angular/core";
import {ToastrService} from 'ngx-toastr';
import {Router} from "@angular/router";

@Injectable()
export class CommonUtil{

  constructor(
    private toastrService:ToastrService,
    private router: Router
  ){}

  getAdminInfo(){
    let adminCache = JSON.parse(localStorage.getItem("admin"));
    if(this.isNull(adminCache)){
      this.router.navigate(["/login"]);
      return null;
    }else{
      if (new Date().getTime() - adminCache.time > 1000*60*60) {// 一小时
        console.log('用户信息已过期');
        this.router.navigate(["/login"]);
        return null;
      }else{
        return JSON.parse(localStorage.getItem("admin")).admin;
      }
    }
  }

  getAuthorization(){
    let authorizationCache = JSON.parse(localStorage.getItem("authorization"));
    if(this.isNull(authorizationCache)){
      this.router.navigate(["/login"]);
      return null;
    }else{
      if (new Date().getTime() - authorizationCache.time > 1000*60*60) {// 一小时
        console.log('authorizationCache已过期');
        this.router.navigate(["/login"]);
        return null;
      }else{
        return JSON.parse(localStorage.getItem("authorization"));
      }
    }
  }

  getDateFormatter(){
    return "yyyy-MM-dd HH:mm:ss";
  }

  /**
   * 判断是否为空
   * @param data 数据
   */
  isNull (data){
    if(data == null || data === '' || typeof data === 'undefined'){
      return true;
    }else{
      return false;
    }
  }

  toastr_error(msg:string,title?:string,positionClass?:string,timeOut?:number){
    if(this.isNull(title)){
      title = '';
    }
    if(this.isNull(title)){
      positionClass = 'toast-bottom-right';
    }
    if(this.isNull(title)){
      timeOut = 1000;
    }
    this.toastrService.error(msg,title,{positionClass: positionClass,timeOut:timeOut});
  }

  toastr_info(msg:string,title?:string,positionClass?:string,timeOut?:number){
    if(this.isNull(title)){
      title = '';
    }
    if(this.isNull(title)){
      positionClass = 'toast-bottom-right';
    }
    if(this.isNull(title)){
      timeOut = 1000;
    }
    this.toastrService.info(msg,title,{positionClass: positionClass,timeOut:timeOut});
  }

  toastr_warning(msg:string,title?:string,positionClass?:string,timeOut?:number){
    if(this.isNull(title)){
      title = '';
    }
    if(this.isNull(title)){
      positionClass = 'toast-bottom-right';
    }
    if(this.isNull(title)){
      timeOut = 1000;
    }
    this.toastrService.warning(msg,title,{positionClass: positionClass,timeOut:timeOut});
  }




}
