import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { IUser } from '../../../model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../../services/job/job.service';
import { IHireJob } from '../../../model/job';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hire-artist',
  imports: [DialogModule, CommonModule, FormsModule],
  templateUrl: './hire-artist.component.html',
  styleUrl: './hire-artist.component.css'
})
export class HireArtistComponent implements OnInit {

  userService = inject(UserService)
  jobService = inject(JobService)
  router = inject(Router)

  visible: boolean = false
  selectedArtist!: IUser
  artistList: IUser[] = []
  hireReq: IHireJob = {
    title: '',
    companyName: '',
    description: '',
    salary: '',
    location: '',
  }

  ngOnInit(): void {
    this.getAllArtist()
  }

  //get all artist
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

  //view artist
  viewArtist(id: string | undefined) {
    this.router.navigate(['/artist', id])
  }

  //Open Dialog
  showDialog(artist: IUser) {
    this.selectedArtist = { ...artist }
    this.visible = true
  }

  //Senting Hiring Request
  sentHireReq(artistId: string | undefined) {
    console.log(artistId);
    this.jobService.sentHireReq(artistId, this.hireReq).subscribe({
      next: () => {
        alert('Successfully sented the hire request')
        this.visible = false
        this.hireReq = {
          title: '',
          companyName: '',
          description: '',
          salary: '',
          location: '',
        }
      },
      error: (err) => {
        alert('failed to sent the request')
        console.error(err.message)
      }
    })
  }

}
