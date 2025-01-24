import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { UserService } from '../../../../services/user/user.service';
import { IUpgradeRole, IUser } from '../../../../model/user';
import { CommonModule } from '@angular/common';
import { PopoverModule } from 'primeng/popover';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-manage-profile',
  imports: [TableModule, CommonModule, PopoverModule, ToastModule],
  templateUrl: './manage-profile.component.html',
  styleUrl: './manage-profile.component.css'
})
export class ManageProfileComponent implements OnInit {

  userService = inject(UserService)
  messageService = inject(MessageService)

  userList: IUser[] = []
  upgradeRoleReqList: IUpgradeRole[] = []
  visible: boolean = false

  isLoading: boolean = false
  loaderRows = Array(6).fill(0)

  ngOnInit(): void {
    this.getAllUser()
    this.getUpgradeRoleReq()
  }

  //Get All User API
  getAllUser() {
    this.isLoading = true
    this.userService.getAllUser().subscribe({
      next: (res: any) => {
        this.userList = res.user
        this.isLoading = false
      },
      error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Network issue, failed to fetch', life: 3000})
        console.error(err.message)
        this.isLoading = false
      }
    })
  }

  getUpgradeRoleReq() {
    this.isLoading = true
    this.userService.getUpgradeRoleReq().subscribe({
      next: (res: any) => {
        this.upgradeRoleReqList = res.roleUpgradeReq
        this.isLoading = false
      },
      error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Network issue, failed to fetch', life: 3000})
        console.error(err.message)
      }
    })
  }

  upgradeRoleRes(upgradeRole: IUpgradeRole) {
    this.userService.upgradeRoleRes(upgradeRole).subscribe({
      next: () => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Upgraded user role', life: 3000})
        this.getUpgradeRoleReq()
      },
      error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to upgrade', life: 3000})
        console.error(err.message)
      }
    })
  }

  rejectUpgradeRole(id: string | undefined) {
    this.userService.rejectUpgradeRole(id).subscribe({
      next: () => {
        this.messageService.add({severity: 'info', summary: 'Info', detail: 'Rejected the role', life: 3000})
        this.getUpgradeRoleReq()
      },
      error: (err) => {
        console.error(err.message)
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to reject', life: 3000})
      }
    })
  }

}
