import {NgModule} from '@angular/core';
import {ShareModule} from '../../share.module';

import {TableModule} from '../../table.module';
import {CategoryComponent} from './category.component';
import {CategoryRoutingModule} from './category-routing.module';

@NgModule({

  declarations: [
    CategoryComponent
  ],

  imports: [
    ShareModule,
    TableModule,
    CategoryRoutingModule
  ]

})

export class CategoryModule { }
