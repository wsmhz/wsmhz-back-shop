import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../service/common/http-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers:[

  ]
})
export class SidebarComponent implements OnInit {

  constructor(
    private httpService:HttpService
  ) { }

  ngOnInit() {
    this.httpService.HttpGet("111admin/11/resource")
      .then(res=>{
        console.log(res);
      });
  }

}
