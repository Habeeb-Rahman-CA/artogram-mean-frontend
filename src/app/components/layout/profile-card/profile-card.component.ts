import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Tooltip } from 'primeng/tooltip';
import { RouterModule } from '@angular/router';
import { IUser } from '../../../model/user';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user/user.service';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SkeletonModule } from 'primeng/skeleton'; 

@Component({
  selector: 'app-profile-card',
  imports: [Tooltip, RouterModule, DialogModule, FormsModule, CommonModule, RadioButtonModule, SkeletonModule],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.css'
})
export class ProfileCardComponent implements OnInit {
  authService = inject(AuthService)
  userService = inject(UserService)

  currentUserData!: IUser
  textToCopy: string = ''
  visible: boolean = false
  isUpgradeOpen: boolean = false
  selectedRole: string = ''
  isLoading: boolean = false

  userDetails: Partial<IUser> = {
    name: '',
    bio: '',
    profilePic: '',
    coverPic: '',
    gender: '',
    phoneNumber: '',
    location: ''
  }

  copyText() {
    navigator.clipboard.writeText(this.textToCopy)
  }

  ngOnInit(): void {
    this.getUser()
  }
  
  showDialog() {
    this.visible = true
  }
  showUpgradeDialog() {
    this.isUpgradeOpen = true
  }

  upgradeRole(){
    this.userService.upgradeRoleReq(this.selectedRole).subscribe({
      next: ()=>{
        alert('Sented upgrade request to admin, you account will be upgraded within 24h')
        this.isUpgradeOpen = false
      },
      error: (err)=>{
        console.error(err.message)
        alert('failed to sent the request')
      }
    })
  }
  
  getUser() {
    this.isLoading = true
    this.userService.getUser().subscribe({
      next: (res: any) => {
        this.authService.setUser(res.user)
        this.currentUserData = res.user
        this.textToCopy = 'www.artogram.com/' + this.currentUserData.name.replace(/\s+/g, '-')
        this.isLoading = false
      },
      error: (err) => {
        console.error(err.message)
        alert('failed to load user data')
        this.isLoading = false
      }
    })
  }

  uploadImg(file: File, imgType: 'profilePic' | 'coverPic') {
    const formData = new FormData()
    formData.append('img', file, file.name)
    this.userService.uploadUserImage(formData).subscribe({
      next: (res: any) => {
        this.userDetails[imgType] = res.img
        alert('image uploaded')
      },
      error: (err) => {
        alert('failed to get the image')
        console.error(err.message)
      }
    })
  }

  updateProfile() {
    this.userService.updateUserProfile(this.userDetails).subscribe({
      next: (res) => {
        alert('Profile Updated')
        this.getUser()
        this.visible = false
      },
      error: (err) => {
        alert('Profile failed updated')
        console.error(err.message)
      }
    })
  }

  onInputChange(event: Event, imgType: 'profilePic' | 'coverPic') {
    const input = event.target as HTMLInputElement
    if (input.files) {
      const file = input.files[0]
      this.userDetails[imgType] = URL.createObjectURL(file)
      this.uploadImg(file, imgType)
    }
    input.value = ''
  }

}
