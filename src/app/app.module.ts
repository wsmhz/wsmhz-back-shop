import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { ContentComponent } from './component/content/content.component';
import { LoginComponent } from './component/system/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { CommonConfig } from './config/commonConfig';
import { CommonUtil } from './utils/commonUtil';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {HttpService} from './service/common/http-service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import { HtmlPipe } from './pipe/html.pipe';
import { AdminComponent } from './component/admin/admin.component';
import { Code404Component } from './component/system/code404/code404/code404.component';
import { WorkComponent } from './component/work/work.component';
import { AdminDetailComponent } from './component/admin/admin-detail/admin-detail.component';
import { RoleComponent } from './component/role/role.component';
import { RoleDetailComponent } from './component/role/role-detail/role-detail.component';
import { ResourceComponent } from './component/resource/resource.component';
import { ProductComponent } from './component/product/product.component';
@NgModule({
  declarations: [

    AppComponent,
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    ContentComponent,
    LoginComponent,
    HomeComponent,
    HtmlPipe,
    AdminComponent,
    Code404Component,
    WorkComponent,
    AdminDetailComponent,
    RoleComponent,
    RoleDetailComponent,
    ResourceComponent,
    ProductComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    CommonConfig,
    CommonUtil,
    HttpService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
