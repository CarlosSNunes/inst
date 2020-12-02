import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'substring'
})
export class SubstringPipe implements PipeTransform {

    transform(value: string, charactersLimit: number): any {
        if (value) {
            let newValue = value;
            if (value.length > charactersLimit) {
                newValue = `${value.substring(0, charactersLimit - 1)}...`;
            }
            return newValue;
        }

        return value;
    }

}
