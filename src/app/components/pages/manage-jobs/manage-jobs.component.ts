import { Component, inject, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { JobService } from '../../../services/job/job.service';
import { IJob } from '../../../model/job';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-jobs',
  imports: [DialogModule, CommonModule, FormsModule],
  templateUrl: './manage-jobs.component.html',
  styleUrl: './manage-jobs.component.css'
})
export class ManageJobsComponent implements OnInit {

  jobService = inject(JobService)

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

  ngOnInit(): void {
    this.categories = ['Painting', 'Drawing', 'Sculpture', 'Photography', 'Digital Art']
    this.jobTypes = ['Full-Time', 'Part-Time', 'Contract', 'Freelance']
    this.getJobs()
  }

  createJob() {
    this.jobService.createJob(this.job).subscribe({
      next: () => {
        alert('New Job oppertunity posted')
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
        alert('failed to post new job')
        console.error(err.message)
      }
    })
  }

  getJobs() {
    this.jobService.getJobsByEmp().subscribe({
      next: (res: any) => {
        this.jobList = res.job
      },
      error: (err) => {
        console.error(err.message)
        alert('failed to fetch')
      }
    })
  }

  closeJob(id: string | undefined) {
    this.jobService.closeJobById(id).subscribe({
      next: () => {
        alert('Job closed successfully')
        this.getJobs()
      },
      error: (err) => {
        console.error(err.message)
        alert("failed to close")
      }
    })
  }

  deleteJob(id: string | undefined) {
    this.jobService.deleteJobById(id).subscribe({
      next: () => {
        alert("Deleted successfully")
        this.getJobs()
      },
      error: (err) => {
        alert('failed to delete')
        console.error(err.message)
      }
    })
  }

  //Open add job dialog
  showDialog() {
    this.visible = true
  }

}
