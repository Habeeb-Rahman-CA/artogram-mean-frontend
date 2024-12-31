import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Avatar } from 'primeng/avatar';
import { Tooltip } from 'primeng/tooltip';
import { AuthService } from '../../../services/auth/auth.service';
import { ProfileCardComponent } from "../../layout/profile-card/profile-card.component";

@Component({
  selector: 'app-artist-dashboard',
  imports: [RouterModule, ProfileCardComponent],
  templateUrl: './artist-dashboard.component.html',
  styleUrl: './artist-dashboard.component.css'
})
export class ArtistDashboardComponent {

}
