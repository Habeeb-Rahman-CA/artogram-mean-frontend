import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [InputTextModule, FloatLabel, PasswordModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
