import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user/user.service';
import { IUser } from '../../../../model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../../../services/job/job.service';
import { IHireJob } from '../../../../model/job';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-hire-artist',
  imports: [DialogModule, CommonModule, FormsModule, ToastModule],
  templateUrl: './hire-artist.component.html',
  styleUrl: './hire-artist.component.css'
})
export class HireArtistComponent implements OnInit {

  userService = inject(UserService)
  jobService = inject(JobService)
  router = inject(Router)
  messageService = inject(MessageService)

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
        this.messageService.add({ severity: 'error', summary: 'Error', data: 'Network error, failed to fetch', life: 3000 })
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
    this.jobService.sentHireReq(artistId, this.hireReq).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Sented', data: 'Successfully sented hiring request', life: 3000 })
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
        this.messageService.add({ severity: 'error', summary: 'Failed', data: 'Failed to sent the request', life: 3000 })
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
        this.messageService.add({ severity: 'error', summary: 'Failed', data: 'Network error, failed to fetch', life: 3000 })
        console.error(err.message)
        this.isLoading = false
      }
    })
  }

}
