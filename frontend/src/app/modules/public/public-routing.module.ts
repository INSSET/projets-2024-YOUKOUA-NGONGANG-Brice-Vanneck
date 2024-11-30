import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import { ApiculteurComponent } from './apiculteur/apiculteur.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'apiculteur',
    component:ApiculteurComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
