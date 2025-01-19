import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Avatar } from 'primeng/avatar';
import { AvatarGroup } from 'primeng/avatargroup';
import { ProfileCardComponent } from "../../../layout/profile-card/profile-card.component";

@Component({
  selector: 'app-admin-dashboard',
  imports: [Avatar, AvatarGroup, RouterModule, ProfileCardComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

}
