import { Component } from '@angular/core';
import { Avatar } from 'primeng/avatar';
import { AvatarGroup } from 'primeng/avatargroup';
import { Tooltip } from 'primeng/tooltip';

@Component({
  selector: 'app-admin-dashboard',
  imports: [Avatar, Tooltip, AvatarGroup],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  textToCopy: string = 'www.artogram.com/habeebrahmanca22'

  copyText() {
    navigator.clipboard.writeText(this.textToCopy)
  }

}
