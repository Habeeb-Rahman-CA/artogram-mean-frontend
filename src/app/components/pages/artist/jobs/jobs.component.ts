import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { JobService } from '../../../../services/job/job.service';
import { IHireJob, IJob } from '../../../../model/job';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-jobs',
  imports: [DialogModule, CommonModule, ToastModule],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent implements OnInit {

  jobService = inject(JobService)
  messageService = inject(MessageService)

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
        this.hireReqList = res.hireReq
        this.isLoading = false
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Network error, Failed to fetch', life: 3000 })
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
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Network error, Failed to fetch', life: 3000})
        console.error(err.message)
        this.isLoading = false
      }
    })
  }

  sentResponseAccepted(requestId: string | undefined) {
    this.jobService.sentHireRes(requestId, 'Accepted').subscribe({
      next: () => {
        this.messageService.add({severity: 'success', summary: 'Sented', detail: 'Response sented successfully', life: 3000})
        this.getHireReqs()
        this.visible = false
      },
      error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Failed', detail: 'Failed to sent the response', life: 3000})
        console.error(err.message)
      }
    })
  }

  sentResponseRejected(requestId: string | undefined) {
    this.jobService.sentHireRes(requestId, 'Rejected').subscribe({
      next: () => {
        this.messageService.add({severity: 'success', summary: 'Sented', detail: 'Response sented successfully', life: 3000})
        this.getHireReqs()
        this.visible = false
      },
      error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Failed', detail: 'Failed to sent the response', life: 3000})
        console.error(err.message)
      }
    })
  }

  showDialog(hireReq: IHireJob) {
    this.selectedHireReq = { ...hireReq }
    this.visible = true
  }

}
