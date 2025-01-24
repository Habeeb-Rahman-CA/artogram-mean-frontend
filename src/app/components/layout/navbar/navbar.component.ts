import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Tooltip } from 'primeng/tooltip';
import { AuthService } from '../../../services/auth/auth.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { BadgeModule } from 'primeng/badge';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, Tooltip, BadgeModule, ToastModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  messageService = inject(MessageService)
  authService = inject(AuthService)
  notificationService = inject(NotificationService)
  router = inject(Router)

  currentUser = this.authService.userData
  notificationCount: number = 0

  ngOnInit(): void {
    this.notificationService.upgradeResCount$.subscribe((count) => {
      this.notificationCount = count
    })
  }

  //Dashboard navigation based on tole
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
      this.messageService.add({severity: 'info', summary: 'Info', detail: 'Please login', life: 3000})
      this.router.navigate(['/login'])
    }
  }

  navigateToNotifyPanel() {
    this.router.navigate(['/notification', this.currentUser.value._id])
  }

  logout() {
    if (this.currentUser.value === null) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'You are not logged in', life: 3000})
      this.router.navigate(['/login'])
    } else {
      this.authService.logoutUser().subscribe(() => {
        this.authService.clearUser()
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'You have been logged out successfully', life: 3000})
        this.router.navigate(['/home'])
      })
    }
  }

}
