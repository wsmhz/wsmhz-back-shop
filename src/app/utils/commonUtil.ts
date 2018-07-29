import { Injectable} from "@angular/core";
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class CommonUtil{

  constructor(
    private toastrService:ToastrService
  ){}

  getAdminInfo(){
    return JSON.parse(localStorage.getItem("admin"));
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
