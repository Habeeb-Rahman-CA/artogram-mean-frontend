import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Avatar } from 'primeng/avatar';
import { Tooltip } from 'primeng/tooltip';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-card',
  imports: [Avatar, Tooltip, RouterModule],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.css'
})
export class ProfileCardComponent implements OnInit {
  authService = inject(AuthService)

  currentUserData: any 
  textToCopy: string = ''

  copyText() {
    navigator.clipboard.writeText(this.textToCopy)
  }

  ngOnInit(): void {
      this.currentUserData = this.authService.userData.value
      this.textToCopy = 'www.artogram.com/' + this.currentUserData.name.replace(/\s+/g, '-')
  }
}
