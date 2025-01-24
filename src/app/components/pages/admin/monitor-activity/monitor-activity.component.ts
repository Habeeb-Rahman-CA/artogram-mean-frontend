import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../../../services/order/order.service';
import { UserService } from '../../../../services/user/user.service';
import { IOrder } from '../../../../model/product';
import { IUser } from '../../../../model/user';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-monitor-activity',
  imports: [CommonModule, ToastModule],
  templateUrl: './monitor-activity.component.html',
  styleUrl: './monitor-activity.component.css'
})
export class MonitorActivityComponent implements OnInit {

  messageService = inject(MessageService)
  orderService = inject(OrderService)
  userService = inject(UserService)

  orderList: IOrder[] = []
  userList: IUser[] = [] 

  isLoading: boolean = false
  loaderRows = Array(6).fill(0)

  ngOnInit(): void {
      this.getAllUser()
      this.getAllOrders()
  }

  getAllUser(){
    this.isLoading = true
    this.userService.getAllUser().subscribe({
      next: (res:any)=>{
        this.userList = res.user
        this.isLoading = false
      },
      error:(err)=>{
        console.error(err.message)
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Network issue, failed to fetch', life: 3000})
        this.isLoading = false
      }
    })
  }

  getAllOrders(){
    this.isLoading = true
    this.orderService.getAllOrders().subscribe({
      next: (res: any)=>{
        this.orderList = res.orders
        this.isLoading = false
      },
      error: (err)=>{
        console.error(err.message)
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Network issue, failed to fetch', life: 3000})
        this.isLoading = false
      }
    })
  }
  
}
