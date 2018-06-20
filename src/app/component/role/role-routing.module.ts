import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {RoleComponent} from './role.component';
import {RoleDetailComponent} from './role-detail/role-detail.component';

const roleRoute: Routes = [
  {path: '', component: RoleComponent},
  {path: 'roleDetail', component: RoleDetailComponent}

];

@NgModule({

  imports: [
    RouterModule.forChild(roleRoute)
  ],
  exports: [
    RouterModule,
  ]

})

export class RoleRoutingModule { }
