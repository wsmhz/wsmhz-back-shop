import {NgModule} from '@angular/core';
import {ShareModule} from '../../share.module';

import {AdminComponent} from './admin.component';
import {AdminDetailComponent} from './admin-detail/admin-detail.component';
import {AdminRoutingModule} from './admin-routing.module';
import {TableModule} from '../../table.module';

@NgModule({

  declarations: [
    AdminComponent,
    AdminDetailComponent,
  ],

  imports: [
    ShareModule,
    TableModule,
    AdminRoutingModule
  ]

})

export class AdminModule { }
