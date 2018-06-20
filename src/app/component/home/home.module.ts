import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {ShareModule} from '../../share.module';
import {HomeRoutingModule} from './home-routing.module';
import {Code404Component} from '../system/code404/code404/code404.component';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {ResourceComponent} from '../resource/resource.component';
import {RoleDetailComponent} from '../role/role-detail/role-detail.component';
import {NavbarComponent} from '../navbar/navbar.component';
import {RoleComponent} from '../role/role.component';
import {ProductComponent} from '../product/product.component';
import {ProductDetailComponent} from '../product/product-detail/product-detail.component';
import {CategoryComponent} from '../category/category.component';
import {ContentComponent} from '../content/content.component';

@NgModule({

  declarations: [
    HomeComponent,

    NavbarComponent,
    SidebarComponent,
    Code404Component,
    RoleComponent,
    RoleDetailComponent,
    ResourceComponent,
    ProductComponent,
    ProductDetailComponent,
    CategoryComponent

  ],

  imports: [
    ShareModule,
    HomeRoutingModule,
  ],


})

export class HomeModule { }
