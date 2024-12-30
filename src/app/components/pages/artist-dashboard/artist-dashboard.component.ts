import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Avatar } from 'primeng/avatar';
import { Tooltip } from 'primeng/tooltip';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-artist-dashboard',
  imports: [RouterModule, Avatar, Tooltip],
  templateUrl: './artist-dashboard.component.html',
  styleUrl: './artist-dashboard.component.css'
})
export class ArtistDashboardComponent implements OnInit {

  authService = inject(AuthService)

  currentUserData: any

  textToCopy: string = 'www.artogram.com/habeebrahmanca22'

  ngOnInit(): void {
      this.getUser()
  }

  copyText() {
    navigator.clipboard.writeText(this.textToCopy)
  }

  getUser(){
    this.authService.getUser().subscribe((data) => {
      this.currentUserData = data
    })
  }

}
