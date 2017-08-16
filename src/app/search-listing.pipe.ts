import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchListing'
})
export class SearchListingPipe implements PipeTransform {

  transform(items: any, term: any): any {
    //check if search term is undefined
    if(term === undefined) return items;
    
    return items.filter(function(items){
      return items.title.toLowerCase().includes(term.toLowerCase());
    })
  }

}
