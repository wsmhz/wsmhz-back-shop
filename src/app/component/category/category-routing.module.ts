import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {CategoryComponent} from './category.component';

const categoryRoute: Routes = [
  {path: '', component: CategoryComponent}

];

@NgModule({

  imports: [
    RouterModule.forChild(categoryRoute)
  ],
  exports: [
    RouterModule,
  ]

})

export class CategoryRoutingModule { }
