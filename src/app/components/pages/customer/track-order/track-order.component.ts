import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../../../services/order/order.service';
import { IOrder } from '../../../../model/product';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { AddDaysPipe } from '../../../../pipes/add-days.pipe'
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-track-order',
  imports: [CommonModule, TableModule, AddDaysPipe, DialogModule, TooltipModule, ToastModule],
  templateUrl: './track-order.component.html',
  styleUrl: './track-order.component.css'
})
export class TrackOrderComponent implements OnInit {

  orderList: IOrder[] = []

  orderService = inject(OrderService)
  messageService = inject(MessageService)

  isLoading: boolean = false

  ngOnInit(): void {
    this.getAllOrders()
  }

  //Order APIs
  getAllOrders() {
    this.isLoading = true
    this.orderService.getOrder().subscribe({
      next: (res: any) => {
        this.orderList = res.orders
        this.isLoading = false
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', data: 'Network Error, Failed to fetch', life: 3000 })
        console.error(err.message)
        this.isLoading = false
      }
    })
  }

  cancelOrder(orderId: string | undefined) {
    this.orderService.cancelOrder(orderId).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Cancelled', data: 'Order has been cancelled', life: 3000 })
        this.getAllOrders()
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', data: 'Order has been failed to cancel', life: 3000 })
        console.error(err)
      }
    })
  }

  deleteOrder(orderId: string | undefined) {
    this.orderService.removeOrder(orderId).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Deleted', data: 'Order has been deleted', life: 3000 })
        this.getAllOrders()
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Failed', data: 'Order has been failed to delete', life: 3000 })
        console.error(err.message)
      }
    })
  }


}
