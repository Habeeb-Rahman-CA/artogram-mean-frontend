import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { JobService } from '../../../../services/job/job.service';
import { IHireJob, IJob } from '../../../../model/job';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jobs',
  imports: [DialogModule, CommonModule],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent implements OnInit {

  jobService = inject(JobService)

  visible: boolean = false
  hireReqList: IHireJob[] = []
  jobList: IJob[] = []
  selectedHireReq: IHireJob = {
    title: '',
    companyName: '',
    description: '',
    salary: '',
    location: '',
  }

  isLoading = false
  loaderRows = Array(6).fill(0)

  ngOnInit(): void {
    this.getHireReqs()
    this.getAllJobs()
  }

  getHireReqs() {
    this.isLoading = true
    this.jobService.getHireReq().subscribe({
      next: (res: any) => {
        console.log(res.hireReq);
        this.hireReqList = res.hireReq
        this.isLoading = false
      },
      error: (err) => {
        alert('failed to fetch')
        console.error(err.message)
        this.isLoading = false
      }
    })
  }

  getAllJobs() {
    this.isLoading = true
    this.jobService.getAllJobs().subscribe({
      next: (res: any) => {
        this.jobList = res.jobs
        this.isLoading = false
      },
      error: (err) => {
        alert('failed to fetch all the jobs')
        console.error(err.message)
        this.isLoading = false
      }
    })
  }

  sentResponseAccepted(requestId: string | undefined) {
    this.jobService.sentHireRes(requestId, 'Accepted').subscribe({
      next: () => {
        alert("Response sented successfully")
        this.getHireReqs()
        this.visible = false
      },
      error: (err) => {
        alert('failed to sent the response')
        console.error(err.message)
      }
    })
  }

  sentResponseRejected(requestId: string | undefined) {
    this.jobService.sentHireRes(requestId, 'Rejected').subscribe({
      next: () => {
        alert("Response sented successfully")
        this.getHireReqs()
        this.visible = false
      },
      error: (err) => {
        alert('failed to sent the response')
        console.error(err.message)
      }
    })
  }

  showDialog(hireReq: IHireJob) {
    this.selectedHireReq = { ...hireReq }
    this.visible = true
  }

}
