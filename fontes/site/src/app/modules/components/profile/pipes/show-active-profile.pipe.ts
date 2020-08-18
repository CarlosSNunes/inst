import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'showActiveProfile'
})
export class ShowActiveProfilePipe implements PipeTransform {

    transform(value: Array<any> = [], ...args: any[]): any {
        return value.filter(v => v.active)
    }

}
