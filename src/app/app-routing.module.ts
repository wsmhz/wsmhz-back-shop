import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Code404Component} from './component/system/code404/code404/code404.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path:"home",loadChildren:'./component/home/home.module#HomeModule'},
  {path:"login",loadChildren: './component/system/login/login.module#LoginModule'},

  {path: '**', component : Code404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
