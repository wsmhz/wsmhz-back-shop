import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './component/system/login/login.component';
import {HomeComponent} from './component/home/home.component';
import {Code404Component} from './component/system/code404/code404/code404.component';
import {WorkComponent} from './component/work/work.component';
import {AdminComponent} from './component/admin/admin.component';
import {AdminDetailComponent} from './component/admin/admin-detail/admin-detail.component';
import {RoleComponent} from "./component/role/role.component";
import {RoleDetailComponent} from "./component/role/role-detail/role-detail.component";
import {ResourceComponent} from './component/resource/resource.component';
import {ProductComponent} from "./component/product/product.component";
import {ProductDetailComponent} from './component/product/product-detail/product-detail.component';
import {CategoryComponent} from './component/category/category.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path:"home",component:HomeComponent,
    children:[
      {path: '', component : WorkComponent},
      {path: 'admin', component : AdminComponent},
      {path: 'adminDetail', component : AdminDetailComponent},
      {path: 'role', component : RoleComponent},
      {path: 'roleDetail', component : RoleDetailComponent},
      {path: 'resource', component : ResourceComponent},

      {path: 'product', component : ProductComponent},
      {path: 'productDetail', component : ProductDetailComponent},
      {path: 'category', component : CategoryComponent},

      {path: '**', component : Code404Component}
    ]},
  {path:"login",component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
