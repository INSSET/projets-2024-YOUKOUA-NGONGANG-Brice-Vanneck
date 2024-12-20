import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
} from '@angular/router';
import {UserHelper} from "../../shared/helpers/user";


@Injectable({
  providedIn: 'root'
})
export class NoAuthGuardService implements CanActivate {
  constructor(private router: Router) { }

  public canActivate(): boolean {
    if (UserHelper.isConnect() ) {
      this.router.navigateByUrl('/accueil');
      return false;
    }else{
      return true;
    }
  }

}
