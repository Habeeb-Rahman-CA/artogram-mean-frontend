import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  upgradeResCount = new BehaviorSubject<number>(0)

  upgradeResCount$ = this.upgradeResCount.asObservable()

  updateCount(count: number) {
    this.upgradeResCount.next(count)
  }
}
