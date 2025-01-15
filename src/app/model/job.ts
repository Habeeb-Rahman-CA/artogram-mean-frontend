export interface IJob {
    _id?: string
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

export interface IHireJob {
    _id?: string
    title: string
    companyName: string
    description: string
    recruiter?: {
        _id: string,
        name: string,
        email: string
    }
    artist?: string
    salary: string
    location: string
    status?: 'Pending' | 'Accepted' | 'Rejected'
}