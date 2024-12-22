import { Component } from '@angular/core';
import { Avatar } from 'primeng/avatar';
import { AvatarGroup } from 'primeng/avatargroup';
import { Tooltip } from 'primeng/tooltip';

@Component({
  selector: 'app-dashboard',
  imports: [Avatar, Tooltip, AvatarGroup],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  textToCopy: string = 'www.artogram.com/habeebrahmanca22'

  copyText() {
    navigator.clipboard.writeText(this.textToCopy)
  }

}
