import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorActivityComponent } from './monitor-activity.component';

describe('MonitorActivityComponent', () => {
  let component: MonitorActivityComponent;
  let fixture: ComponentFixture<MonitorActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonitorActivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitorActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
