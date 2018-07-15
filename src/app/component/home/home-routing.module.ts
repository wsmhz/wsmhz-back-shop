import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';
import {RoleComponent} from '../role/role.component';
import {RoleDetailComponent} from '../role/role-detail/role-detail.component';
import {ResourceComponent} from '../resource/resource.component';
import {ProductComponent} from '../product/product.component';
import {ProductDetailComponent} from '../product/product-detail/product-detail.component';
import {CategoryComponent} from '../category/category.component';
import {Code404Component} from '../system/code404/code404/code404.component';
import {ResourceModule} from '../resource/resource.module';
import {ProductModule} from '../product/product.module';
import {CategoryModule} from '../category/category.module';

const homeRoute: Routes = [
  {path: '', component: HomeComponent,
  children:[
    {path: '', loadChildren:'../work/work.module#WorkModule'},
    {path: 'admin', loadChildren:'../admin/admin.module#AdminModule'},
    {path: 'role', loadChildren:'../role/role.module#RoleModule'},
    {path: 'resource', loadChildren:'../resource/resource.module#ResourceModule'},

    {path: 'product', loadChildren : '../product/product.module#ProductModule'},
    {path: 'category', loadChildren : '../category/category.module#CategoryModule'},
    {path: 'order', loadChildren : '../order/order.module#OrderModule'},
    {path: 'report', loadChildren : '../report/report.module#ReportModule'},
  ]}

];

@NgModule({

  imports: [
    RouterModule.forChild(homeRoute)
  ],
  exports: [
    RouterModule,
  ]

})

export class HomeRoutingModule { }
