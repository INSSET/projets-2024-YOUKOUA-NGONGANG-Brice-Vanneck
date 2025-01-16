import {DOCUMENT, NgIf} from '@angular/common';
import { Component, inject, Inject, Renderer2 } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {Title} from "@angular/platform-browser";
import {MessageService} from "primeng/api";
import {AuthService} from "../../../services/auth/auth.service";
import {UserHelper} from "../../../shared/helpers/user";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule, ToastModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers:[MessageService,AuthService]
})
export class RegisterComponent {

  private title = inject(Title);
  Register={
    email:"",
    numero: "",
    nom: "",
    password: "",
    confirmPassword: "",
  };


  private formBuilder = inject(FormBuilder)

  submitting = false;
  registerForm = this.formBuilder.group({
    nom: new FormControl('', [ Validators.required]),
    email: new FormControl('', [Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')]),
    password: new FormControl('', [ Validators.required]),
    confirmPassword: new FormControl('', [ Validators.required]),

  });

  constructor (@Inject(DOCUMENT) private document: Document,private renderer: Renderer2,
               private router: Router,
               private authService: AuthService,
               private messageService: MessageService,
               ) {

    this.title.setTitle('Inscription');

  }


  ngOnInit(): void {
    this.renderer.addClass(this.document.body, 'bg-auth');

  }

  ngOnDestroy(): void {
    this.renderer.removeClass(this.document.body, 'bg-auth');
  }


  onSubmit(){
    this.submitting = true;
    console.log(this.Register)
    let regi={
      email:this.Register.email,
      nom: this.Register.nom,
      password: this.Register.password,
      roles:["ROLE_USER"]
    }

    this.authService.register(regi).subscribe({
      next:(response)=>{

        console.log('Statut HTTP :', response.status);
        console.log('Body de la réponse :', response.body);



        this.messageService.add({
          severity: 'success',
          summary: 'inscription réussi !',
          detail: 'Veuillez verifier vos mail pour continuer',
          life: 2000
        });
        this.submitting = false;
        setTimeout(() =>
          {
            this.router.navigate(['/auth/connexion']);
          },
          2000);
      },
      error:(err)=>{
        this.submitting = false;

        this.submitting = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Informations incorrectes !',
          detail: 'un problème a été rencontré ',
          life: 3000
        });
      }
    });






  }



}
