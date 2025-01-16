import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserHelper } from '../helpers/user';
import { AuthService } from '../../services/auth/auth.service';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf,NgClass ,RouterLink, ReactiveFormsModule,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers:[AuthService]
})
export class HeaderComponent implements OnInit{

  userData:any;


  constructor( private router: Router,
    private authService:AuthService,){

  }

  ngOnInit(): void {
    this.userData=UserHelper.getUser();
  }

  checkConnected():boolean{
    if(UserHelper.isConnect()){
      //console.log(this.userData)
      return true;
    }else{
      UserHelper.disconect();
      return false;
    }
  }



  disconnect(): void{
    UserHelper.disconect();

    this.router.navigateByUrl('/accueil');
  }

  isRoute(url:string){
    if(this.router.url === url){
      return true;
    }
    return false;
  }

}
