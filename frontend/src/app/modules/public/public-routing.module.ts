import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import { ApiculteurComponent } from './apiculteur/apiculteur.component';
import { AuthguardService } from '../../services/auth/authguard.service';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'accueil',
    component:HomeComponent
  },
  {
    path:'apiculteur',
    component:ApiculteurComponent,
    canActivate:[AuthguardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
