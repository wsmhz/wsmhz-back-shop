import { Injectable} from "@angular/core";

@Injectable()
export class CommonUtil{

  getAdminInfo(){
    return JSON.parse(window.localStorage.getItem("admin"));
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
}
