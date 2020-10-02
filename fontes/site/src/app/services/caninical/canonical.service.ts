
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CanonicalService {

    constructor(
        @Inject(DOCUMENT) private dom: Document,
        ) { }

    createCanonicalURL() {
        let link: HTMLLinkElement = this.dom.querySelector('link[rel="canonical"]')
        if (!link) {
            link = this.dom.createElement('link');
            link.setAttribute('rel', 'canonical');
            this.dom.head.appendChild(link);
        } else {
            link.setAttribute('href', `${environment.SELF_URL}${this.dom.location.pathname}`);
        }
    }
}