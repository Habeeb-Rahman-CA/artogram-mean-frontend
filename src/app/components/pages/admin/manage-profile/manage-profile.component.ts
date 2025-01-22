import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { UserService } from '../../../../services/user/user.service';
import { IUpgradeRole, IUser } from '../../../../model/user';
import { CommonModule } from '@angular/common';
import { PopoverModule } from 'primeng/popover';

@Component({
  selector: 'app-manage-profile',
  imports: [TableModule, CommonModule, PopoverModule],
  templateUrl: './manage-profile.component.html',
  styleUrl: './manage-profile.component.css'
})
export class ManageProfileComponent implements OnInit {

  userService = inject(UserService)

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
        alert('failed to fetch all the users')
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
        alert('failed to get all req')
        console.error(err.message)
      }
    })
  }

  upgradeRoleRes(upgradeRole: IUpgradeRole) {
    this.userService.upgradeRoleRes(upgradeRole).subscribe({
      next: () => {
        alert('upgraded user role')
        this.getUpgradeRoleReq()
      },
      error: (err) => {
        alert('failed to upgrade')
        console.error(err.message)
      }
    })
  }

  rejectUpgradeRole(id: string | undefined) {
    this.userService.rejectUpgradeRole(id).subscribe({
      next: () => {
        alert('rejected the role')
        this.getUpgradeRoleReq()
      },
      error: (err) => {
        console.error(err.message)
        alert('failed to reject')
      }
    })
  }

}
