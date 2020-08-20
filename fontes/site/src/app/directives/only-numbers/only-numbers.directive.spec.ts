import { OnlyNumbersDirective } from './only-numbers.directive';
import { ElementRef } from '@angular/core';

describe('OnlyNumbersDirective', () => {
    it('should create an instance', () => {
        const nativeElement: HTMLElement = new HTMLElement()
        const elementRef: ElementRef = new ElementRef(nativeElement)
        const directive = new OnlyNumbersDirective(elementRef);
        expect(directive).toBeTruthy();
    });
});
