import {NgModule} from '@angular/core';
import {ShareModule} from '../../share.module';
import {WorkComponent} from '../work/work.component';
import {WorkRoutingModule} from './work-routing.module';

@NgModule({

  declarations: [

    WorkComponent,
  ],

  imports: [
    ShareModule,
    WorkRoutingModule,
  ]

})

export class WorkModule { }
