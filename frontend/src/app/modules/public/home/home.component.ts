import {Component, inject} from '@angular/core';
import {FooterComponent} from "../../../shared/footer/footer.component";
import {HeaderComponent} from "../../../shared/header/header.component";
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,RouterLink,ReactiveFormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {


  private title = inject(Title);


  constructor() {
    this.title.setTitle('Accueil');
  }
}
