import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterOptions',
})
export class FilterOptionsPipe implements PipeTransform {
  transform(options: any[], filterText: string): any[] {
    if (!options || !filterText) {
      return options;
    }

    const filterValue = filterText.toLowerCase();
    return options.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }
}