import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IJob } from '../../model/job';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  baseUrl = 'http://localhost:8001/api/job'

  constructor(private http: HttpClient) { }

  //Job based APIs
  createJob(job: IJob) {
    return this.http.post(this.baseUrl, job, { withCredentials: true })
  }

  getJobsByEmp() {
    return this.http.get(this.baseUrl, { withCredentials: true })
  }

  closeJobById(jobId: string | undefined) {
    return this.http.patch(`${this.baseUrl}/close`, { jobId }, { withCredentials: true })
  }

  deleteJobById(id: string | undefined) {
    return this.http.delete(`${this.baseUrl}/${id}`, { withCredentials: true })
  }

}
