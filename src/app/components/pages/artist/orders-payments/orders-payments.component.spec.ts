import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersPaymentsComponent } from './orders-payments.component';

describe('OrdersPaymentsComponent', () => {
  let component: OrdersPaymentsComponent;
  let fixture: ComponentFixture<OrdersPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersPaymentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
