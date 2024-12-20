import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  constructor (@Inject(DOCUMENT) private document: Document,private renderer: Renderer2) {

  }


  ngOnInit(): void {
    this.renderer.addClass(this.document.body, 'bg-auth');

  }

  ngOnDestroy(): void {
    this.renderer.removeClass(this.document.body, 'bg-auth');
  }


}
