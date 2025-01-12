import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { UserService } from '../../../services/user/user.service';
import { IUser } from '../../../model/user';
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
  visible: boolean = false

  ngOnInit(): void {
      this.getAllUser()
  }

  //Get All User API
  getAllUser() {
    this.userService.getAllUser().subscribe({
      next: (res: any) => {
        this.userList = res.user
      },
      error: (err) => {
        alert('failed to fetch all the users')
        console.error(err.message)
      }
    })
  }

}
