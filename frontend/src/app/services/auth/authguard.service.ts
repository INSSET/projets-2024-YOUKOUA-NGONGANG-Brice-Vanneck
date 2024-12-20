import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {UserHelper} from "../../shared/helpers/user";

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {
  constructor(private router: Router) { }

  public canActivate(): boolean {

    if (UserHelper.isConnect()) {
      //if (UserHelper.getUser().role === 'user'){
        //this.router.navigate(['/accueil']);
      //}
      return true;
    }else{
      this.router.navigate(['/auth/connexion']);
      return false;
    }
  }

}
