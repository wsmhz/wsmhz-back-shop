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

const homeRoute: Routes = [
  {path: '', component: HomeComponent,
  children:[
    {path: '', loadChildren:'../work/work.module#WorkModule'},
    {path: 'admin', loadChildren:'../admin/admin.module#AdminModule'},
    {path: 'role', loadChildren:'../role/role.module#RoleModule'},
    {path: 'resource', component : ResourceComponent},

    {path: 'product', component : ProductComponent},
    {path: 'productDetail', component : ProductDetailComponent},
    {path: 'category', component : CategoryComponent},

    {path: '**', component : Code404Component}
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
