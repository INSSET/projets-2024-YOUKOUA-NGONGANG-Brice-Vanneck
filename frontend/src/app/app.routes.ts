import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'auth',
    loadChildren:()=> import('../app/modules/auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path:'',
    loadChildren:()=>import('../app/modules/public/public.module').then(m=>m.PublicModule)
  }
];
