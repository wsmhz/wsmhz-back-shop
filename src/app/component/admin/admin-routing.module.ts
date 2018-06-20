import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {AdminDetailComponent} from './admin-detail/admin-detail.component';

const adminRoute: Routes = [
  {path: '', component: AdminComponent},
  {path: 'adminDetail', component: AdminDetailComponent}

];

@NgModule({

  imports: [
    RouterModule.forChild(adminRoute)
  ],
  exports: [
    RouterModule,
  ]

})

export class AdminRoutingModule { }
