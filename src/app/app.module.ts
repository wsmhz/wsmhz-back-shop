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
import {AppRoutingModule} from 'app/app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {HttpService} from './service/common/http-service';

@NgModule({
  declarations: [

    AppComponent,
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    ContentComponent,
    LoginComponent,
    HomeComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    CommonConfig,
    CommonUtil,
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
