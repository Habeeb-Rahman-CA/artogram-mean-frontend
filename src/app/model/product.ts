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

interface IAddress {
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

interface OrderItem {
    product: IProduct
    price: number;
}

export interface IOrder {
    _id?: string
    user: string
    items: OrderItem[];
    total: number;
    address: IAddress;
    status: 'Placed' | 'Shipped' | 'Delivered' | 'Cancelled';
    createdAt: Date;
}