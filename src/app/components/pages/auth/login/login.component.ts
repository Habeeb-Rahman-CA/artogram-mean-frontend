import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [InputTextModule, FloatLabel, PasswordModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  authService = inject(AuthService)
  router = inject(Router)

  email: string = 'habeebrahmanca22@gmail.com'
  password: string = 'habizz'

  login() {
    this.authService.loginUser(this.email, this.password).subscribe({
      next: (res: any) => {
        alert('Logged in successfully')
        this.email = ''
        this.password = ''
        this.authService.setUser(res.user)
        // Navigation based on role
        const role = this.authService.getUserRole()
        if (role === 'admin') {
          this.router.navigate(['/admin-dashboard'])
        } else if (role === 'artist') {
          this.router.navigate(['/artist-dashboard'])
        } else if (role === 'employer') {
          this.router.navigate(['/employer-dashboard'])
        } else if (role === 'customer') {
          this.router.navigate(['/products'])
        } else {
          alert('Something went wrong')
        }
      },
      error: () => alert('Error logging in')
    })
  }

}
