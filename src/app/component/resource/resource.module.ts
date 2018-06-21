import {NgModule} from '@angular/core';
import {ShareModule} from '../../share.module';

import {TableModule} from '../../table.module';
import {ResourceComponent} from './resource.component';
import {ResourceRoutingModule} from './resource-routing.module';

@NgModule({

  declarations: [
    ResourceComponent
  ],

  imports: [
    ShareModule,
    TableModule,
    ResourceRoutingModule
  ]

})

export class ResourceModule { }
