import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../../../services/order/order.service';
import { UserService } from '../../../../services/user/user.service';
import { IOrder } from '../../../../model/product';
import { IUser } from '../../../../model/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-monitor-activity',
  imports: [CommonModule],
  templateUrl: './monitor-activity.component.html',
  styleUrl: './monitor-activity.component.css'
})
export class MonitorActivityComponent implements OnInit {

  orderService = inject(OrderService)
  userService = inject(UserService)

  orderList: IOrder[] = []
  userList: IUser[] = [] 

  ngOnInit(): void {
      this.getAllUser()
      this.getAllOrders()
  }

  getAllUser(){
    this.userService.getAllUser().subscribe({
      next: (res:any)=>{
        console.log(res.user);
        this.userList = res.user
      },
      error:(err)=>{
        console.error(err.message)
        alert('failed to fetch')
      }
    })
  }

  getAllOrders(){
    this.orderService.getAllOrders().subscribe({
      next: (res: any)=>{
        console.log(res.orders);
        this.orderList = res.orders
      },
      error: (err)=>{
        console.error(err.message)
        alert('failed to fetch')
      }
    })
  }
  
}
