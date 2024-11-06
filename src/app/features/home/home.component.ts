import { Component } from '@angular/core';

// Components
import { NavbarComponent } from "../../shared/components/navbar/navbar/navbar.component";
import { InputSearchComponent } from "../../shared/components/input-search/input-search/input-search.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, InputSearchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
