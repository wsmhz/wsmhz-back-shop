import { Injectable} from "@angular/core";

@Injectable()
export class CommonUtil{

  static RESPONSE_CODE = {
    SUCCESS : "0",
    NEED_LOGIN:"-10",
    ERROR:"1"
  }
  /**
   * 判断是否为空
   * @param data 数据
   */
  public isNull (data){
    if(data == null || data === '' || typeof data === 'undefined'){
      return true;
    }else{
      return false;
    }
  }
}
