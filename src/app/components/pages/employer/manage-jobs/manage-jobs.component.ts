import { Component, inject, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { JobService } from '../../../../services/job/job.service';
import { IJob } from '../../../../model/job';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-manage-jobs',
  imports: [DialogModule, CommonModule, FormsModule, ToastModule],
  templateUrl: './manage-jobs.component.html',
  styleUrl: './manage-jobs.component.css'
})
export class ManageJobsComponent implements OnInit {

  jobService = inject(JobService)
  messageService = inject(MessageService)

  visible: boolean = false
  categories: string[] = []
  jobTypes: string[] = []
  jobList: IJob[] = []
  job: IJob = {
    title: '',
    companyName: '',
    description: '',
    jobType: '',
    category: '',
    numberOfOpening: 0,
    recruiter: '',
    salary: '',
    location: '',
  }

  isLoading = false
  laoderRows = Array(8).fill(0)

  ngOnInit(): void {
    this.categories = ['Painting', 'Drawing', 'Sculpture', 'Photography', 'Digital Art']
    this.jobTypes = ['Full-Time', 'Part-Time', 'Contract', 'Freelance']
    this.getJobs()
  }

  createJob() {
    this.jobService.createJob(this.job).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Posted', data: 'New job oppertunity posted', life: 3000 })
        this.visible = false
        this.job = {
          title: '',
          companyName: '',
          description: '',
          jobType: '',
          category: '',
          numberOfOpening: 0,
          recruiter: '',
          salary: '',
          location: '',
        }
        this.getJobs()
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', data: 'Failed to post the job', life: 3000 })
        console.error(err.message)
      }
    })
  }

  getJobs() {
    this.isLoading = true
    this.jobService.getJobsByEmp().subscribe({
      next: (res: any) => {
        this.jobList = res.job
        this.isLoading = false
      },
      error: (err) => {
        console.error(err.message)
        this.messageService.add({ severity: 'error', summary: 'Failed', data: 'Network error, failed to fetch', life: 3000 })
        this.isLoading = false
      }
    })
  }

  closeJob(id: string | undefined) {
    this.jobService.closeJobById(id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Closed', data: 'Job closed successfully', life: 3000 })
        this.getJobs()
      },
      error: (err) => {
        console.error(err.message)
        this.messageService.add({ severity: 'error', summary: 'Failed', data: 'Failed to close the job', life: 3000 })
      }
    })
  }

  deleteJob(id: string | undefined) {
    this.jobService.deleteJobById(id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Deleted', data: 'Job deleted successfully', life: 3000 })
        this.getJobs()
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Failed', data: 'Failed to delete the job', life: 3000 })
        console.error(err.message)
      }
    })
  }

  //Open add job dialog
  showDialog() {
    this.visible = true
  }

}
