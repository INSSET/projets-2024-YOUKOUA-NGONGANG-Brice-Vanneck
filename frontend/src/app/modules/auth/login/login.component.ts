import { DOCUMENT, NgIf } from '@angular/common';
import { Component, inject, Inject, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {Router, RouterLink} from "@angular/router";
import { AuthService } from '../../../services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { UserHelper } from '../../../shared/helpers/user';
import {ToastModule} from "primeng/toast";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [RouterLink, ReactiveFormsModule, FormsModule, NgIf, ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers:[AuthService,MessageService]
})
export class LoginComponent {

  private title = inject(Title);
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
    this.title.setTitle('Connexion');
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(this.document.body, 'bg-auth');
  }

  onSubmit(){
    this.submitting=true;

    this.authService.login(this.login).subscribe({
      next:(response)=>{

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
          tok.id=data.id;
          console.log(tok);
          UserHelper.disconect();
          this.messageService.add({
            severity: 'success',
            summary: 'Accès autorisé !',
            detail: 'Connexion réussi',
            life: 3000
          });

          UserHelper.connect(tok);
          this.router.navigateByUrl('/apiculteur');

          this.submitting=false;
        });

      },
      error:(err)=>{
        this.submitting = false;

        this.messageService.add({
          severity: 'error',
          summary: 'Informations incorrectes !',
          detail: 'Verifier votre login ou votre mot de passe',
          life: 3000
        });
      }
    });





  }


}
