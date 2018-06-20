import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path:"home",loadChildren:'./component/home/home.module#HomeModule'},
  {path:"login",loadChildren: './component/system/login/login.module#LoginModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
