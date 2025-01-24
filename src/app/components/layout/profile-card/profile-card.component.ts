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
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile-card',
  imports: [Tooltip, RouterModule, DialogModule, FormsModule, CommonModule, RadioButtonModule, SkeletonModule, ToastModule],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.css'
})
export class ProfileCardComponent implements OnInit {

  messageService = inject(MessageService)
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
      this.messageService.add({severity: 'info', summary: 'Info', detail: 'Sented upgrade request to admin, you account will be upgraded within 24h', life: 3000})
        this.isUpgradeOpen = false
      },
      error: (err)=>{
        console.error(err.message)
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to sent request', life: 3000})
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
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to load user data', life: 3000})
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
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Image uploaded successfully', life: 3000})
      },
      error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to get the image', life: 3000})
        console.error(err.message)
      }
    })
  }

  updateProfile() {
    this.userService.updateUserProfile(this.userDetails).subscribe({
      next: (res) => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Profile updated', life: 3000})
        this.getUser()
        this.visible = false
      },
      error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Profile failed to update', life: 3000})
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
