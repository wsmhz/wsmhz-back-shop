import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {ShareModule} from './share.module';
import {ContentComponent} from './component/content/content.component';
import {Code404Component} from './component/system/code404/code404/code404.component';

@NgModule({
  declarations: [
    AppComponent,
    Code404Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
