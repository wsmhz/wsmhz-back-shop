import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {ResourceComponent} from './resource.component';

const resourceRoute: Routes = [
  {path: '', component: ResourceComponent}

];

@NgModule({

  imports: [
    RouterModule.forChild(resourceRoute)
  ],
  exports: [
    RouterModule,
  ]

})

export class ResourceRoutingModule { }
