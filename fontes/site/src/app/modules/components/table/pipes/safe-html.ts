import { Pipe,  } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safe' })
export class SafeHtml {
    constructor(private sanitizer: DomSanitizer) { }

    transform(html) {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }
}