import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonConfig} from './config/commonConfig';
import {CommonUtil} from './utils/commonUtil';
import {HttpService} from './service/common/http-service';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

/**
 * 共享模块，在项目中多处使用，可以在此定义，在使用的地方直接导入ShareModule即可
 */

@NgModule({

  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],

  providers: [
    CommonConfig,
    CommonUtil,
    HttpService
  ]

})

export class ShareModule { }
