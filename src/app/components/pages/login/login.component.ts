import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [InputTextModule,FloatLabel, PasswordModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
