import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHireJob, IJob } from '../../model/job';

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

  getAllJobs() {
    return this.http.get(`${this.baseUrl}/artist`, { withCredentials: true })
  }

  closeJobById(jobId: string | undefined) {
    return this.http.patch(`${this.baseUrl}/close`, { jobId }, { withCredentials: true })
  }

  deleteJobById(id: string | undefined) {
    return this.http.delete(`${this.baseUrl}/${id}`, { withCredentials: true })
  }

  //Job Hire based APIs
  sentHireReq(artistId: string | undefined, hireJob: IHireJob) {
    return this.http.post(`${this.baseUrl}/hire/request`, { artistId, hireJob }, { withCredentials: true })
  }

  sentHireRes(requestId: string | undefined, response: string) {
    return this.http.post(`${this.baseUrl}/hire/response`, { requestId, response }, { withCredentials: true })
  }

  getHireReq() {
    return this.http.get(`${this.baseUrl}/hire/request`, { withCredentials: true })
  }

  getHireRes() {
    return this.http.get(`${this.baseUrl}/hire/response`, { withCredentials: true })
  }

}
