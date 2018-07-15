import {NgModule} from '@angular/core';
import {ShareModule} from '../../share.module';
import {ReportComponent} from './report.component';
import {ReportRoutingModule} from './report-routing.module';

@NgModule({

  declarations: [
    ReportComponent
  ],

  imports: [
    ShareModule,
    ReportRoutingModule
  ]

})

export class ReportModule { }
