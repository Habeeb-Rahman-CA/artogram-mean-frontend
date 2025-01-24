import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  imports: [InputTextModule, FloatLabel, PasswordModule, RouterModule, FormsModule, ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  messageService = inject(MessageService)
  authService = inject(AuthService)
  router = inject(Router)

  email: string = ''
  password: string = ''

  login() {
    this.authService.loginUser(this.email, this.password).subscribe({
      next: (res: any) => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Logged in successfully', life: 3000})
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
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'failed to navigate', life: 3000})
        }
      },
      error: (err) => this.messageService.add({severity: 'error', summary: 'Error', detail: 'Something went wrong', life: 3000})
    })
  }

}
