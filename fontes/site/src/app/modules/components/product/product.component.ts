import { Component, OnInit, ElementRef, ViewChild, Input, HostListener } from '@angular/core';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
    @ViewChild('sectionProduct', { static: false }) sectionProduct: ElementRef<HTMLElement>;
    @Input() backgroundColorClass: string = 'white-background-color';
    public getScreenWidth: any;
    constructor() {
    }

    ngOnInit() {
        this.onWindowResize();
    }

    @HostListener('window:resize')
    onWindowResize() {
        this.getScreenWidth = window.innerWidth;
    }

    get offsetTop(): number {
        return this.sectionProduct.nativeElement.offsetTop;
    }

}
