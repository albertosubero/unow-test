import { Pipe, PipeTransform } from '@angular/core';
import { IDate } from '../../interfaces/employees.interface';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {

  transform(dateObj: IDate) {
    return `${dateObj.year}/${dateObj.month}/${dateObj.day}`;
  }

}