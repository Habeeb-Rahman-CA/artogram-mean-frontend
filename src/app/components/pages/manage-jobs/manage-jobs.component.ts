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
  }

  createJob(){
    console.log(this.job);
  }

  //Open add job dialog
  showDialog() {
    this.visible = true
  }

}
