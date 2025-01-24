import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user/user.service';
import { IUser } from '../../../../model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../../../services/job/job.service';
import { IHireJob } from '../../../../model/job';
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
  hireResList: IHireJob[] = []
  hireReq: IHireJob = {
    title: '',
    companyName: '',
    description: '',
    salary: '',
    location: '',
  }

  isLoading = false
  loaderRows = Array(4).fill(0)

  ngOnInit(): void {
    this.getAllArtist()
    this.getHireRes()
  }

  //get all artist
  getAllArtist() {
    this.isLoading = true
    this.userService.getAllArtist().subscribe({
      next: (res: any) => {
        this.artistList = res.user
        this.isLoading = false
      },
      error: (err) => {
        console.error(err.message)
        alert('failed to fetch')
        this.isLoading = false
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

  getHireRes() {
    this.isLoading = true
    this.jobService.getHireRes().subscribe({
      next: (res: any) => {
        this.hireResList = res.hireRes
        this.isLoading = false
      },
      error: (err) => {
        alert('failed to fetch')
        console.error(err.message)
        this.isLoading = false
      }
    })
  }

}
