import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Avatar } from 'primeng/avatar';
import { Tooltip } from 'primeng/tooltip';

@Component({
  selector: 'app-employer-dashboard',
  imports: [Tooltip, Avatar, RouterModule],
  templateUrl: './employer-dashboard.component.html',
  styleUrl: './employer-dashboard.component.css'
})
export class EmployerDashboardComponent {

  textToCopy: string = 'www.artogram.com/habeebrahmanca22'

  copyText() {
    navigator.clipboard.writeText(this.textToCopy)
  }

}
