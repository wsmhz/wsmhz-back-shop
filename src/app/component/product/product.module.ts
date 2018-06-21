import {NgModule} from '@angular/core';
import {ShareModule} from '../../share.module';

import {TableModule} from '../../table.module';
import {ProductComponent} from './product.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ProductRoutingModule} from './product-routing.module';

@NgModule({

  declarations: [
    ProductComponent,
    ProductDetailComponent
  ],

  imports: [
    ShareModule,
    TableModule,
    ProductRoutingModule
  ]

})

export class ProductModule { }
