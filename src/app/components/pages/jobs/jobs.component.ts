import { Component, inject, OnInit } from '@angular/core';
import { JobService } from '../../../services/job/job.service';
import { IHireJob } from '../../../model/job';
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
  selectedHireReq!: IHireJob

  ngOnInit(): void {
    this.getHireReqs()
  }

  getHireReqs() {
    this.jobService.getHireReq().subscribe({
      next: (res: any) => {
        this.hireReqList = res.hireReq
      },
      error: (err) => {
        alert('failed to fetch')
        console.error(err.message)
      }
    })
  }

  sentResponseAccepted(requestId: string | undefined) {
    this.jobService.sentHireRes(requestId, 'Accepted').subscribe({
      next: () =>{
        alert("Response sented successfully")
        this.getHireReqs()
      },
      error: (err) =>{
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
