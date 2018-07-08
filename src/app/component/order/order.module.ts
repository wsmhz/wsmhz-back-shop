import {NgModule} from '@angular/core';
import {ShareModule} from '../../share.module';

import {TableModule} from '../../table.module';
import {OrderComponent} from './order.component';
import {OrderDetailComponent} from './order-detail/order-detail.component';
import {OrderRoutingModule} from './order-routing.module';

@NgModule({

  declarations: [
    OrderComponent,
    OrderDetailComponent
  ],

  imports: [
    ShareModule,
    TableModule,
    OrderRoutingModule
  ]

})

export class OrderModule { }
