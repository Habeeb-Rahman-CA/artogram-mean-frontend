import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/layout/navbar/navbar.component";
import { FooterComponent } from "./components/layout/footer/footer.component";
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  authService = inject(AuthService)

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.authService.userData.next(JSON.parse(currentUser));
    }
  }
}
