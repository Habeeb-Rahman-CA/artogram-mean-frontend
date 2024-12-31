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

  currentUser = this.authService.userData

  getDashboard() {
    if (this.currentUser.value && this.currentUser.value.role) {
      if (this.currentUser.value.role === 'customer') {
        this.router.navigate(['/customer-profile'])
      } else if (this.currentUser.value.role === 'admin') {
        this.router.navigate(['/admin-dashboard'])
      } else if (this.currentUser.value.role === 'artist') {
        this.router.navigate(['/artist-dashboard'])
      } else if (this.currentUser.value.role === 'employer') {
        this.router.navigate(['/employer-dashboard'])
      }
    } else {
      alert('You are not logged In')
      this.router.navigate(['/login'])
    }
  }

  logout() {
    if (this.currentUser === null) {
      alert('You are not logged In')
      this.router.navigate(['/login'])
    } else {
      this.authService.logoutUser().subscribe(() => {
        this.authService.clearUser()
        alert('You have been logged out successfully')
        this.router.navigate(['/home'])
      })
    }
  }

}
