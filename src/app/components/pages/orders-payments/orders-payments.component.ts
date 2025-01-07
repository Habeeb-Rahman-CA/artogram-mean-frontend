import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { IOrder } from '../../../model/product';

@Component({
  selector: 'app-orders-payments',
  imports: [TableModule, CommonModule],
  templateUrl: './orders-payments.component.html',
  styleUrl: './orders-payments.component.css'
})
export class OrdersPaymentsComponent {


}
