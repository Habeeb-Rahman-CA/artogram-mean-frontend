export interface IJob {
    title: string
    companyName: string
    description: string
    jobType: string
    category: string
    numberOfOpening: number
    recruiter: string
    salary: string
    location: string
    status?: 'Open' | 'Closed'
    postedDate?: Date
    deadlineDate?: Date
}