export interface IUser {
    bio: string
    coverPic: string
    createdAt: string
    email: string
    gender: string
    adresses?: Array<IAddress>
    location: string
    name: string
    password: string
    phoneNumber: string
    profilePic: string
    role: string
    _id: string
}

export interface IAddress {
    fullName: string; 
    phoneNumber: string;
    address: string;
    street: string;
    landmark: string;
    city: string;
    pincode: string;
    state: string;
    _id?: string
}
