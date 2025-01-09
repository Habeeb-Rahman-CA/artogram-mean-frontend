import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Avatar } from 'primeng/avatar';
import { Tooltip } from 'primeng/tooltip';
import { RouterModule } from '@angular/router';
import { IUser } from '../../../model/user';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-profile-card',
  imports: [Avatar, Tooltip, RouterModule, DialogModule, FormsModule, CommonModule],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.css'
})
export class ProfileCardComponent implements OnInit {
  authService = inject(AuthService)
  userService = inject(UserService)

  currentUserData!: IUser
  textToCopy: string = ''
  visible: boolean = false

  userDetails: Partial<IUser> = {
    name: this.currentUserData?.name,
    bio: '',
    profilePic: '',
    coverPic: '',
    gender: '',
    phoneNumber: ''
  }

  copyText() {
    navigator.clipboard.writeText(this.textToCopy)
  }

  ngOnInit(): void {
    this.currentUserData = this.authService.userData.value
    this.textToCopy = 'www.artogram.com/' + this.currentUserData.name.replace(/\s+/g, '-')
  }

  showDialog() {
    this.visible = true
  }

  updateProfile() {
    this.userService.updateUserProfile(this.userDetails).subscribe({
      next: (res) => {
        console.log(res);
        alert('Profile Updated')
        this.visible = false
      },
      error:(err) =>{
        alert('Profile failed updated')
        console.error(err)
      }
    })
  }

}
