import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Avatar } from 'primeng/avatar';
import { AvatarGroup } from 'primeng/avatargroup';
import { Tooltip } from 'primeng/tooltip';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [Avatar, Tooltip, AvatarGroup, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

  authService = inject(AuthService)

  currentUserData: any
  textToCopy: string = 'www.artogram.com/habeebrahmanca22'

  copyText() {
    navigator.clipboard.writeText(this.textToCopy)
  }

  ngOnInit(): void {
      this.getUser()
  }

  getUser(){
    this.authService.getUser().subscribe((data) => {
      this.currentUserData = data
    })
  }

}
