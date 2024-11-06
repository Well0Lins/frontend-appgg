import { Component } from '@angular/core';

// Components
import { NavbarComponent } from "../../shared/components/navbar/navbar/navbar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
