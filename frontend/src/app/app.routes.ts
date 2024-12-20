import { Routes } from '@angular/router';
import { NoAuthGuardService } from './services/auth/noAuthGuard.service';

export const routes: Routes = [
  {
    path:'auth',
    loadChildren:()=> import('../app/modules/auth/auth.module').then(m=>m.AuthModule),
    canActivate:[NoAuthGuardService]
  },
  {
    path:'',
    loadChildren:()=>import('../app/modules/public/public.module').then(m=>m.PublicModule)
  }
];
