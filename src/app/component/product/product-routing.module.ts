import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {ProductComponent} from './product.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';

const productRoute: Routes = [
  {path: '', component : ProductComponent},
  {path: 'productDetail', component : ProductDetailComponent},

];

@NgModule({

  imports: [
    RouterModule.forChild(productRoute)
  ],
  exports: [
    RouterModule,
  ]

})

export class ProductRoutingModule { }
