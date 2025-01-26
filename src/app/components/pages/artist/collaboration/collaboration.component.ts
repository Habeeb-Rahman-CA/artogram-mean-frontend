import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user/user.service';
import { IUser } from '../../../../model/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-collaboration',
  imports: [CommonModule, FormsModule, ToastModule],
  templateUrl: './collaboration.component.html',
  styleUrl: './collaboration.component.css'
})
export class CollaborationComponent implements OnInit {

  userService = inject(UserService)
  messageService = inject(MessageService)

  artistList: IUser[] = []
  filteredArtist: IUser[] = []
  searchQuery: string = ''

  isLoading = false
  loaderRows = Array(7).fill(0)

  ngOnInit(): void {
    this.getAllArtist()
  }

  getAllArtist() {
    this.isLoading = true
    this.userService.getAllArtistExceptLogger().subscribe({
      next: (res: any) => {
        this.artistList = res.user
        this.filteredArtist = [...this.artistList]
        this.isLoading = false
      },
      error: (err) => {
        console.error(err)
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to fetch', life: 3000})
        this.isLoading = false
      }
    })
  }

  searchFilter() {
    this.filteredArtist = this.filteredArtist.filter(artist => {
      return artist.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    })
  }

  applyFilter() {
    this.filteredArtist = [...this.artistList]
    this.searchFilter()
  }

}
