import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Tooltip } from 'primeng/tooltip';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, Tooltip],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  authService = inject(AuthService)
  router = inject(Router)

  logout(){
    alert('You have been logged out successfully.')
    this.authService.logoutUser().subscribe(() =>{
      this.authService.clearUser()
      this.router.navigate(['/home'])
    })
  }

}
