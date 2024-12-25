import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Avatar } from 'primeng/avatar';
import { Tooltip } from 'primeng/tooltip';

@Component({
  selector: 'app-artist-dashboard',
  imports: [RouterModule, Avatar, Tooltip],
  templateUrl: './artist-dashboard.component.html',
  styleUrl: './artist-dashboard.component.css'
})
export class ArtistDashboardComponent {

  textToCopy: string = 'www.artogram.com/habeebrahmanca22'

  copyText() {
    navigator.clipboard.writeText(this.textToCopy)
  }

}
