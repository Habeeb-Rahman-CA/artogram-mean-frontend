import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { IUser } from '../../../model/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-hire-artist',
  imports: [],
  templateUrl: './hire-artist.component.html',
  styleUrl: './hire-artist.component.css'
})
export class HireArtistComponent implements OnInit {

  userService = inject(UserService)
  router = inject(Router)

  artistList: IUser[] = []

  ngOnInit(): void {
    this.getAllArtist()
  }

  getAllArtist() {
    this.userService.getAllArtist().subscribe({
      next: (res: any) => {
        this.artistList = res.user
      },
      error: (err) => {
        console.error(err.message)
        alert('failed to fetch')
      }
    })
  }

  viewArtist(id: string | undefined) {
    this.router.navigate(['/artist', id])
  }

}
