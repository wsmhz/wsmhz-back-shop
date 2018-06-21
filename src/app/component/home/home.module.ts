import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {ShareModule} from '../../share.module';
import {HomeRoutingModule} from './home-routing.module';
import {Code404Component} from '../system/code404/code404/code404.component';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {NavbarComponent} from '../navbar/navbar.component';
import {ProductComponent} from '../product/product.component';
import {ProductDetailComponent} from '../product/product-detail/product-detail.component';
import {CategoryComponent} from '../category/category.component';

@NgModule({

  declarations: [
    HomeComponent,

    NavbarComponent,
    SidebarComponent,

  ],

  imports: [
    ShareModule,
    HomeRoutingModule,
  ],


})

export class HomeModule { }
