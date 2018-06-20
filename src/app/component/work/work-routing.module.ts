import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {WorkComponent} from '../work/work.component';


const workRoute: Routes = [
  {path: '', component: WorkComponent}

];

@NgModule({

  imports: [
    RouterModule.forChild(workRoute)
  ],
  exports: [
    RouterModule,
  ]

})

export class WorkRoutingModule { }
