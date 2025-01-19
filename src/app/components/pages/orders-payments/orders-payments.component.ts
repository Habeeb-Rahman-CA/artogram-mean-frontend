import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { IOrder } from '../../../model/product';
import { OrderService } from '../../../services/order/order.service';

@Component({
  selector: 'app-orders-payments',
  imports: [TableModule, CommonModule],
  templateUrl: './orders-payments.component.html',
  styleUrl: './orders-payments.component.css'
})
export class OrdersPaymentsComponent implements OnInit {

  orderService = inject(OrderService)

  orders: IOrder[] = []

  ngOnInit(): void {
    this.getAllOrders()
  }

  getAllOrders() {
    this.orderService.getArtistProductOrder().subscribe({
      next: (res: any) => {
        this.orders = res.filteredOrder
        console.log(this.orders);
      }
    })
  }

}
