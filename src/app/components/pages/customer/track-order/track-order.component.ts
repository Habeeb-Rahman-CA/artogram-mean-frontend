import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../../../services/order/order.service';
import { IOrder } from '../../../../model/product';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { AddDaysPipe } from '../../../../pipes/add-days.pipe'
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-track-order',
  imports: [CommonModule, TableModule, AddDaysPipe, DialogModule, TooltipModule],
  templateUrl: './track-order.component.html',
  styleUrl: './track-order.component.css'
})
export class TrackOrderComponent implements OnInit {

  orderList: IOrder[] = []

  orderService = inject(OrderService)

  ngOnInit(): void {
    this.getAllOrders()
  }

  //Order APIs
  getAllOrders() {
    this.orderService.getOrder().subscribe({
      next: (res: any) => {
        this.orderList = res.orders
        console.log(this.orderList);
      },
      error: (err) => {
        alert('something went wrong')
        console.error(err.message)
      }
    })
  }

  cancelOrder(orderId: string | undefined) {
    this.orderService.cancelOrder(orderId).subscribe({
      next: () => {
        alert('Order cancelled')
        this.getAllOrders()
      },
      error: (err) => {
        alert('Order failed to cancel')
        console.error(err)
      }
    })
  }

  deleteOrder(orderId: string | undefined) {
    this.orderService.removeOrder(orderId).subscribe({
      next: () => {
        alert('Order removed successfully')
        this.getAllOrders()
      },
      error: (err) => {
        alert('Failed to remove order')
        console.error(err.message)
      }
    })
  }


}
