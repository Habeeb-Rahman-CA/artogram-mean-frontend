import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
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

  email: string = ''
  password: string = ''

  login() {
    this.authService.loginUser(this.email, this.password).subscribe({
      next: () =>{
        alert('Logged in successfully')
        this.email = ''
        this.password = ''
        this.router.navigate(['/admin-dashboard'])
      },
      error: () => alert('Error logging in')
    })
  }

}
