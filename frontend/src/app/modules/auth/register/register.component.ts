import { DOCUMENT } from '@angular/common';
import { Component, inject, Inject, Renderer2 } from '@angular/core';
import {RouterLink} from "@angular/router";
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule, FormsModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {


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

  constructor (@Inject(DOCUMENT) private document: Document,private renderer: Renderer2) {

  }


  ngOnInit(): void {
    this.renderer.addClass(this.document.body, 'bg-auth');

  }

  ngOnDestroy(): void {
    this.renderer.removeClass(this.document.body, 'bg-auth');
  }


  onSubmit(){



    
  }



}
