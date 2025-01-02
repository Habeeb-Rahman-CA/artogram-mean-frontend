export interface IProduct {
    _id?: string
    name: string
    category: string
    img?: string
    desc: string
    price: string
    createdBy?: {
        _id: string
        name: string,
        profilePic: string
    }
}
