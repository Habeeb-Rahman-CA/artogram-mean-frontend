import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../services/auth/auth.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  imports: [InputTextModule, FloatLabel, PasswordModule, RouterModule, FormsModule, ToastModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  messageService = inject(MessageService)
  authService = inject(AuthService)
  router = inject(Router)

  name: string = ''
  email: string = ''
  password: string = ''

  register() {
    this.authService.registerUser(this.name, this.email, this.password).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User registered successfully', life: 3000 })
        this.name = ''
        this.email = ''
        this.password = ''
        this.router.navigate(['/login'])
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong', life: 3000 })
    })
  }

}
