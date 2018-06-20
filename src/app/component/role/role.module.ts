import {NgModule} from '@angular/core';
import {ShareModule} from '../../share.module';
import {TableModule} from '../../table.module';
import {RoleComponent} from './role.component';
import {RoleDetailComponent} from './role-detail/role-detail.component';
import {RoleRoutingModule} from './role-routing.module';

@NgModule({

  declarations: [
    RoleComponent,
    RoleDetailComponent
  ],

  imports: [
    ShareModule,
    TableModule,
    RoleRoutingModule
  ]

})

export class RoleModule { }
