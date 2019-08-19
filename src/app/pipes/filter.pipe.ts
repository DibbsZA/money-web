import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'connectionFilter'
})
export class ConnectionFilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) { return []; }
    if (!searchText) { return items; }
    // searchText = searchText.toLowerCase();
    return items.filter(it => {
      return it.connectionId.includes(searchText);
    });
  }

}
