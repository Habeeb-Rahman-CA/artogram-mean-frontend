import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [InputTextModule, FloatLabel, PasswordModule, RouterModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  authService = inject(AuthService)
  router = inject(Router)

  name: string = ''
  email: string = ''
  password: string = ''

  register() {
    this.authService.registerUser(this.name, this.email, this.password).subscribe({
      next: () => {
        alert('User registered successfully')
        this.name = ''
        this.email = ''
        this.password = ''
        this.router.navigate(['/login'])
      },
      error: () => alert("Something went wrong")
    })
  }

}
