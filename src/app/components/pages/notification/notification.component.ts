import { Component, inject, OnInit } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { UserService } from '../../../services/user/user.service';
import { IUpgradeRole } from '../../../model/user';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../services/notification/notification.service';

@Component({
  selector: 'app-notification',
  imports: [CheckboxModule, CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {

  userService = inject(UserService)
  notificationService = inject(NotificationService)
  route = inject(ActivatedRoute)

  upgradeResList: IUpgradeRole[] = []

  isLoading = false
  loaderRows = Array(4).fill(0)

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id']
      this.getAllRes(id)
    })
  }

  getAllRes(id: string) {
    this.isLoading = true
    this.userService.getUpgradeRoleRes(id).subscribe({
      next: (res: any) => {
        this.upgradeResList = res.roleUpgradeRes
        this.notificationService.updateCount(this.upgradeResList.length)
        this.isLoading = false
      },
      error: (err) => {
        console.error(err.message)
        this.isLoading = false
      }
    })
  }

}
