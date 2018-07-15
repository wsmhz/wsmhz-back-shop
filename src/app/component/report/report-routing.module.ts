import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {ReportComponent} from './report.component';

const reportRoute: Routes = [
  {path: '', component : ReportComponent},

];

@NgModule({

  imports: [
    RouterModule.forChild(reportRoute)
  ],
  exports: [
    RouterModule,
  ]

})

export class ReportRoutingModule { }
