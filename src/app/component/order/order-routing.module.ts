import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {OrderComponent} from './order.component';
import {OrderDetailComponent} from './order-detail/order-detail.component';

const orderRoute: Routes = [
  {path: '', component : OrderComponent},
  {path: 'orderDetail', component : OrderDetailComponent},

];

@NgModule({

  imports: [
    RouterModule.forChild(orderRoute)
  ],
  exports: [
    RouterModule,
  ]

})

export class OrderRoutingModule { }
