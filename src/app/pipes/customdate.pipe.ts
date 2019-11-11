import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customdate'
})
export class CustomdatePipe implements PipeTransform {

  transform(value: any): string {
    ('0' + value).slice(-2) + '-'
             + ('0' + (value.getMonth()+1)).slice(-2) + '-'
             + value.getFullYear();
    return value;
  }

}
