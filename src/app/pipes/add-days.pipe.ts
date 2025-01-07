import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addDays'
})
export class AddDaysPipe implements PipeTransform {

  transform(value: Date | string, days: number): Date {
    const date = new Date(value)
    date.setDate(date.getDate() + days)
    return date
  }

}
