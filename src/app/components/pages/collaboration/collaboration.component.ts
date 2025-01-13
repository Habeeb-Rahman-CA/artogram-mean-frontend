import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { IUser } from '../../../model/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-collaboration',
  imports: [CommonModule, FormsModule],
  templateUrl: './collaboration.component.html',
  styleUrl: './collaboration.component.css'
})
export class CollaborationComponent implements OnInit {

  userService = inject(UserService)

  artistList: IUser[] = []
  filteredArtist: IUser[] = []
  searchQuery: string = ''

  ngOnInit(): void {
    this.getAllArtist()
  }

  getAllArtist() {
    this.userService.getAllArtistExceptLogger().subscribe({
      next: (res: any) => {
        this.artistList = res.user
        this.filteredArtist = [...this.artistList]
      },
      error: (err) => {
        console.error(err)
        alert('failed to fetch')
      }
    })
  }

  searchFilter() {
    this.filteredArtist = this.filteredArtist.filter(artist => {
      return artist.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    })
  }

  applyFilter(){
    this.filteredArtist = [...this.artistList]
    this.searchFilter()
  }

}
