import { Injectable } from '@angular/core';
import {HttpService} from '../common/http-service';

@Injectable()
export class ResourceService {

  constructor(
    private httpService : HttpService
  ) { }

  selectAllResource(){
    return this.httpService.HttpGet("resource");
  }
}
