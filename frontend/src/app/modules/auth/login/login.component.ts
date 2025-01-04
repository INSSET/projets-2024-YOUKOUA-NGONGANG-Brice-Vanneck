import { DOCUMENT, NgIf } from '@angular/common';
import { Component, inject, Inject, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {Router, RouterLink} from "@angular/router";
import { AuthService } from '../../../services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { UserHelper } from '../../../shared/helpers/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule, FormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers:[AuthService,MessageService]
})
export class LoginComponent {


  submitting=false;

  login={
    username:"",
    password:""
  }

  private formBuilder = inject(FormBuilder)

  authform = this.formBuilder.group({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
});


  constructor (@Inject(DOCUMENT) private document: Document,private renderer: Renderer2,private authService:AuthService,
  private messageService: MessageService,private router: Router) {

  }


  ngOnInit(): void {
    this.renderer.addClass(this.document.body, 'bg-auth');

  }

  ngOnDestroy(): void {
    this.renderer.removeClass(this.document.body, 'bg-auth');
  }

  onSubmit(){
    this.submitting=true;

    this.authService.login(this.login).subscribe(response=>{
       
        console.log('Statut HTTP :', response.status);
        console.log('Body de la réponse :', response.body);

        let res = response.body;

        res.email="";
        res.roles="";
        let us={
          email:"",
          roles:[],
          token:res.token,
          refresh_token:res.refresh_token
        }

        UserHelper.connect(us);

        this.authService.getCurentUser().subscribe(data=>{

          let tok = UserHelper.getUser();
          tok.email=data.email;
          tok.roles=data.roles;
          console.log(tok);
          //UserHelper.disconect();
          UserHelper.connect(tok);
          this.router.navigateByUrl('/apiculteur');
          this.submitting=false;
        });

    });




  }


}
